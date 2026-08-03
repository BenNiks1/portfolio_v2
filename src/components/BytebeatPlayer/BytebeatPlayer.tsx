import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './BytebeatPlayer.module.scss'
import { bytebeatTracks, BytebeatTrack } from './tracks'

const workletSource = `
class BytebeatProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this.t = 0
    this.formulaFn = null
    this.formulaRate = 8000
    this.step = 1
    this.playing = false
    this.samplesSinceReport = 0
    this.port.onmessage = event => {
      const msg = event.data
      if (msg.type === 'formula') {
        try {
          const fn = new Function('t', 'return (' + msg.formula + ') & 255')
          fn(0)
          this.formulaFn = fn
        } catch (e) {
          this.formulaFn = null
          this.port.postMessage({ type: 'error', message: String(e) })
        }
        this.t = 0
        this.formulaRate = msg.sampleRate
        this.step = msg.sampleRate / sampleRate
      } else if (msg.type === 'play') {
        this.playing = true
      } else if (msg.type === 'pause') {
        this.playing = false
      } else if (msg.type === 'stop') {
        this.playing = false
        this.t = 0
        this.port.postMessage({ type: 'time', seconds: 0 })
      }
    }
  }

  process(inputs, outputs) {
    const channel = outputs[0][0]
    if (!channel) return true

    if (!this.playing || !this.formulaFn) {
      channel.fill(0)
      return true
    }

    try {
      for (let i = 0; i < channel.length; i++) {
        const value = this.formulaFn(Math.floor(this.t)) & 255
        channel[i] = (value - 128) / 128
        this.t += this.step
      }
    } catch (e) {
      channel.fill(0)
      this.playing = false
      this.port.postMessage({ type: 'error', message: String(e) })
    }

    this.samplesSinceReport += channel.length
    if (this.samplesSinceReport >= sampleRate / 10) {
      this.samplesSinceReport = 0
      this.port.postMessage({ type: 'time', seconds: this.t / this.formulaRate })
    }
    return true
  }
}
registerProcessor('bytebeat-processor', BytebeatProcessor)
`

export const BytebeatPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<BytebeatTrack>(
    bytebeatTracks[0]
  )
  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(0.3)

  const audioContextRef = useRef<AudioContext | null>(null)
  const workletNodeRef = useRef<AudioWorkletNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isPlayingRef = useRef<boolean>(false)
  const loadedTrackIdRef = useRef<number | null>(null)
  const volumeRef = useRef<number>(volume)

  useEffect(() => {
    volumeRef.current = volume
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume
    }
  }, [volume])

  useEffect(
    () => () => {
      isPlayingRef.current = false
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (workletNodeRef.current) {
        workletNodeRef.current.disconnect()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    },
    []
  )

  const ensureAudioGraph = useCallback(async () => {
    let ctx = audioContextRef.current

    if (!ctx) {
      const AudioContextCtor =
        window.AudioContext || (window as any).webkitAudioContext
      ctx = new AudioContextCtor() as AudioContext

      const blob = new Blob([workletSource], { type: 'application/javascript' })
      const url = URL.createObjectURL(blob)
      try {
        await ctx.audioWorklet.addModule(url)
      } finally {
        URL.revokeObjectURL(url)
      }

      const gain = ctx.createGain()
      gain.gain.value = volumeRef.current
      gain.connect(ctx.destination)

      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      analyser.connect(gain)

      const node = new AudioWorkletNode(ctx, 'bytebeat-processor', {
        numberOfInputs: 0,
        outputChannelCount: [1],
      })
      node.port.onmessage = event => {
        const msg = event.data
        if (msg.type === 'time') {
          setTime(msg.seconds)
        } else if (msg.type === 'error') {
          console.error('Bytebeat formula error:', msg.message)
          isPlayingRef.current = false
          setIsPlaying(false)
        }
      }
      node.connect(analyser)

      audioContextRef.current = ctx
      gainNodeRef.current = gain
      analyserRef.current = analyser
      workletNodeRef.current = node
    }

    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
    return workletNodeRef.current!
  }, [])

  const drawVisualization = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!isPlayingRef.current) return

      animationFrameRef.current = requestAnimationFrame(draw)
      analyser.getByteTimeDomainData(dataArray)

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 2
      ctx.strokeStyle = '#0f0'
      ctx.beginPath()

      const sliceWidth = canvas.width / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * canvas.height) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x += sliceWidth
      }

      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()

      analyser.getByteFrequencyData(dataArray)
      const barWidth = (canvas.width / bufferLength) * 4
      let barX = 0

      for (let i = 0; i < bufferLength / 4; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.8

        const hue = (i / bufferLength) * 360
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.7)`
        ctx.fillRect(barX, canvas.height - barHeight, barWidth, barHeight)

        barX += barWidth + 1
      }
    }

    draw()
  }, [])

  const play = useCallback(
    async (track: BytebeatTrack) => {
      let node: AudioWorkletNode
      try {
        node = await ensureAudioGraph()
      } catch (error) {
        console.error('Web Audio init failed:', error)
        return
      }

      if (loadedTrackIdRef.current !== track.id) {
        node.port.postMessage({
          type: 'formula',
          formula: track.formula,
          sampleRate: track.sampleRate,
        })
        loadedTrackIdRef.current = track.id
        setTime(0)
      }

      node.port.postMessage({ type: 'play' })
      isPlayingRef.current = true
      setIsPlaying(true)
      drawVisualization()
    },
    [ensureAudioGraph, drawVisualization]
  )

  const pause = useCallback(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.port.postMessage({ type: 'pause' })
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    isPlayingRef.current = false
    setIsPlaying(false)
  }, [])

  const stop = useCallback(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.port.postMessage({ type: 'stop' })
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    isPlayingRef.current = false
    setIsPlaying(false)
    setTime(0)
  }, [])

  const handleTrackSelect = (track: BytebeatTrack) => {
    setSelectedTrack(track)
    if (isPlayingRef.current) {
      play(track)
    } else {
      loadedTrackIdRef.current = null
      setTime(0)
    }
  }

  return (
    <div className={styles.player}>
      <div className={styles.player__header}>
        <h2>🎵 Bytebeat Player</h2>
        <p className={styles.player__subtitle}>Algorithmic music generation</p>
      </div>

      <div className={styles.player__visualizer}>
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className={styles.player__canvas}
        />
        {!isPlaying && (
          <div className={styles.player__placeholder}>
            <p>▶ Press Play to start visualization</p>
          </div>
        )}
      </div>

      <div className={styles.player__info}>
        <div className={styles.player__track}>
          <strong>{selectedTrack.title}</strong>
          <span className={styles.player__author}>
            by {selectedTrack.author}
          </span>
        </div>
        <div className={styles.player__formula}>
          <code>{selectedTrack.formula}</code>
        </div>
        {selectedTrack.description && (
          <div className={styles.player__description}>
            {selectedTrack.description}
          </div>
        )}
        <div className={styles.player__meta}>
          Sample Rate: {selectedTrack.sampleRate}Hz | Time: {time.toFixed(1)}s
        </div>
      </div>

      <div className={styles.player__controls}>
        <button
          className={styles.player__button}
          onClick={isPlaying ? pause : () => play(selectedTrack)}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button className={styles.player__button} onClick={stop}>
          ⏹ Stop
        </button>
        <div className={styles.player__volume}>
          <label>Volume:</label>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
          />
          <span>{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <div className={styles.player__playlist}>
        <h3>Playlist ({bytebeatTracks.length} tracks)</h3>
        <div className={styles.player__tracks}>
          {bytebeatTracks.map(track => (
            <div
              key={track.id}
              className={`${styles.player__trackItem} ${
                track.id === selectedTrack.id ? styles.active : ''
              }`}
              onClick={() => handleTrackSelect(track)}
            >
              <span className={styles.player__trackNumber}>{track.id}</span>
              <div className={styles.player__trackDetails}>
                <div className={styles.player__trackTitle}>{track.title}</div>
                <div className={styles.player__trackAuthor}>{track.author}</div>
              </div>
              <span className={styles.player__trackRate}>
                {track.sampleRate}Hz
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
