import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './BytebeatPlayer.module.scss'
import { bytebeatTracks, BytebeatTrack } from './tracks'

export const BytebeatPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<BytebeatTrack>(
    bytebeatTracks[0]
  )
  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(0.3)

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const isPlayingRef = useRef<boolean>(false)

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)()
    gainNodeRef.current = audioContextRef.current.createGain()
    gainNodeRef.current.gain.value = volume
    gainNodeRef.current.connect(audioContextRef.current.destination)

    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 2048
    analyserRef.current.connect(gainNodeRef.current)

    return () => {
      stop()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume
    }
  }, [volume])

  const generateBytebeat = useCallback(
    (formula: string, sampleRate: number, duration: number = 30) => {
      const samples = sampleRate * duration
      const buffer = audioContextRef.current!.createBuffer(
        1,
        samples,
        sampleRate
      )
      const data = buffer.getChannelData(0)

      try {
        const func = new Function('t', `return (${formula}) & 255`)

        for (let t = 0; t < samples; t++) {
          const value = func(t)
          data[t] = (value - 128) / 128
        }
      } catch (error) {
        console.error('Error in bytebeat formula:', error)
        for (let i = 0; i < samples; i++) {
          data[i] = 0
        }
      }

      return buffer
    },
    []
  )

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

  const play = useCallback(() => {
    if (!audioContextRef.current || isPlaying) return

    const buffer = generateBytebeat(
      selectedTrack.formula,
      selectedTrack.sampleRate
    )
    const source = audioContextRef.current.createBufferSource()
    source.buffer = buffer
    source.connect(analyserRef.current!)
    source.loop = true
    source.start(0)

    sourceNodeRef.current = source
    startTimeRef.current = Date.now()
    isPlayingRef.current = true
    setIsPlaying(true)
    drawVisualization()
  }, [selectedTrack, generateBytebeat, drawVisualization, isPlaying])

  const pause = useCallback(() => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop()
      sourceNodeRef.current = null
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    isPlayingRef.current = false
    setIsPlaying(false)
  }, [])

  const stop = useCallback(() => {
    pause()
    setTime(0)
    startTimeRef.current = 0
  }, [pause])

  const handleTrackSelect = (track: BytebeatTrack) => {
    const wasPlaying = isPlaying
    stop()
    setSelectedTrack(track)
    if (wasPlaying) {
      setTimeout(() => play(), 100)
    }
  }

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      setTime(elapsed)
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

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
          onClick={isPlaying ? pause : play}
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
