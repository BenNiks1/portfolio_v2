import React, { useEffect, useRef, useState, useCallback } from 'react'
import cn from 'classnames'
import styles from './Game.module.scss'
import { GameEngine } from './GameEngine'
import { GameState } from './types'
import {
  COLUMNS_NUMBER,
  ENEMY_COLUMN_COUNT,
  ENEMY_ROWS_COUNT,
  ROWS_NUMBER,
} from './constants'

import bg from '../../assets/game/background.png'
import playerFrame from '../../assets/game/hero/player.png'
import playerSitFrame from '../../assets/game/hero/sit.png'
import playerJumpFrame from '../../assets/game/hero/jump.png'
import playerHit from '../../assets/game/hero/hit.png'
import barrier from '../../assets/game/enemy/commonEnemy/enemy.png'
import zeroHearts from '../../assets/game/0heartrs.png'
import oneHeart from '../../assets/game/1heartrs.png'
import twoHearts from '../../assets/game/2heartrs.png'
import threeHearts from '../../assets/game/3heartrs.png'

export const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameEngineRef = useRef<GameEngine | null>(null)
  const [gameState, setGameState] = useState<GameState>(GameState.MENU)
  const [playerName, setPlayerName] = useState('')

  const imagesRef = useRef({
    background: new Image(),
    player: new Image(),
    playerSit: new Image(),
    playerJump: new Image(),
    playerHit: new Image(),
    enemy: new Image(),
    hearts: [new Image(), new Image(), new Image(), new Image()],
  })

  useEffect(() => {
    const images = imagesRef.current
    images.background.src = bg
    images.player.src = playerFrame
    images.playerSit.src = playerSitFrame
    images.playerJump.src = playerJumpFrame
    images.playerHit.src = playerHit
    images.enemy.src = barrier
    images.hearts[0].src = zeroHearts
    images.hearts[1].src = oneHeart
    images.hearts[2].src = twoHearts
    images.hearts[3].src = threeHearts
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    gameEngineRef.current = new GameEngine(canvasRef.current)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const engine = gameEngineRef.current
      if (!engine) return

      if (gameState === GameState.PLAYING) {
        if (e.code === 'ArrowUp' || e.code === 'Space') {
          e.preventDefault()
          engine.player.jump()
        } else if (e.code === 'ArrowDown') {
          e.preventDefault()
          engine.player.duck()
        } else if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
          e.preventDefault()
          engine.player.moveLeft()
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
          e.preventDefault()
          engine.player.moveRight()
        } else if (e.code === 'Escape') {
          e.preventDefault()
          engine.pause()
          setGameState(engine.isPaused ? GameState.PAUSED : GameState.PLAYING)
        }
      } else if (gameState === GameState.PAUSED && e.code === 'Escape') {
        e.preventDefault()
        engine.pause()
        setGameState(GameState.PLAYING)
      }
    },
    [gameState]
  )

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const engine = gameEngineRef.current
    if (!engine) return

    if (e.code === 'ArrowDown') {
      e.preventDefault()
      engine.player.stand()
    } else if (
      e.code === 'ArrowLeft' ||
      e.code === 'KeyA' ||
      e.code === 'ArrowRight' ||
      e.code === 'KeyD'
    ) {
      e.preventDefault()
      engine.player.stopMoving()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    engine: GameEngine
  ) => {
    const background = imagesRef.current.background
    const bgWidth = 950
    const canvas = canvasRef.current!

    const bgX =
      Math.floor(engine.settings.cameraX / bgWidth) * bgWidth -
      (engine.settings.cameraX % bgWidth)
    const count = Math.ceil(canvas.width / bgWidth) + 2

    for (let i = 0; i < count; i++) {
      ctx.drawImage(
        background,
        bgX + i * bgWidth - engine.settings.cameraX,
        0,
        bgWidth,
        canvas.height
      )
    }
  }

  const drawPlayer = (ctx: CanvasRenderingContext2D, engine: GameEngine) => {
    const player = engine.player
    const maxFrame = COLUMNS_NUMBER * ROWS_NUMBER - 1
    const frame = engine.currentFrame % (maxFrame + 1)
    const column = frame % COLUMNS_NUMBER
    const row = Math.floor(frame / COLUMNS_NUMBER)

    let image = imagesRef.current.player
    if (player.state.isHit) {
      image = imagesRef.current.playerHit
    } else if (player.state.isJumping) {
      image = imagesRef.current.playerJump
    } else if (player.state.isDucking) {
      image = imagesRef.current.playerSit
    }

    ctx.drawImage(
      image,
      column * player.frameWidth,
      row * player.frameHeight,
      player.frameWidth,
      player.frameHeight,
      player.position.x,
      player.position.y - player.state.jumpHeight,
      player.frameWidth,
      player.frameHeight
    )
  }

  const drawEnemies = (ctx: CanvasRenderingContext2D, engine: GameEngine) => {
    const image = imagesRef.current.enemy

    engine.enemies.forEach(enemy => {
      const column = enemy.state.frame % ENEMY_ROWS_COUNT
      const row = Math.floor(enemy.state.frame / ENEMY_COLUMN_COUNT)

      ctx.drawImage(
        image,
        column * enemy.frameWidth,
        row * enemy.frameHeight,
        enemy.frameWidth,
        enemy.frameHeight,
        enemy.position.x,
        enemy.position.y,
        enemy.frameWidth,
        enemy.frameHeight
      )
    })
  }

  const drawLife = (ctx: CanvasRenderingContext2D, engine: GameEngine) => {
    const lifeImage =
      imagesRef.current.hearts[engine.life] || imagesRef.current.hearts[0]
    ctx.drawImage(lifeImage, 20, 40, 54, 16)
  }

  const drawScore = (ctx: CanvasRenderingContext2D, engine: GameEngine) => {
    ctx.font = 'bold 16px Arial'
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 3
    ctx.strokeText(`Score: ${engine.score}`, 8, 20)
    ctx.fillText(`Score: ${engine.score}`, 8, 20)

    ctx.font = '12px Arial'
    ctx.strokeText(`Best: ${engine.highScore}`, 8, 75)
    ctx.fillText(`Best: ${engine.highScore}`, 8, 75)
    if (engine.settings.difficulty > 0) {
      ctx.fillText(`Level: ${engine.settings.difficulty + 1}`, 8, 95)
    }
  }

  const drawPauseOverlay = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current!
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 48px Arial'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 4
    const text = 'PAUSED'
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2)
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    ctx.font = '20px Arial'
    const hint = 'Press ESC to continue'
    ctx.strokeText(hint, canvas.width / 2, canvas.height / 2 + 50)
    ctx.fillText(hint, canvas.width / 2, canvas.height / 2 + 50)
    ctx.textAlign = 'left'
  }

  useEffect(() => {
    if (!canvasRef.current || !gameEngineRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const engine = gameEngineRef.current

    let animationId: number

    const gameLoop = () => {
      if (gameState === GameState.PLAYING) {
        engine.update()

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        drawBackground(ctx, engine)
        drawPlayer(ctx, engine)
        drawEnemies(ctx, engine)
        drawLife(ctx, engine)
        drawScore(ctx, engine)

        engine.drawHitboxes(ctx)

        if (!engine.isRunning) {
          setGameState(GameState.GAME_OVER)
        }
      } else if (gameState === GameState.PAUSED) {
        drawPauseOverlay(ctx)
      }

      animationId = requestAnimationFrame(gameLoop)
    }

    if (gameState === GameState.PLAYING || gameState === GameState.PAUSED) {
      gameLoop()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [gameState])

  const handleStartGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const engine = gameEngineRef.current
    if (!engine) return

    engine.reset()
    engine.start()
    setGameState(GameState.PLAYING)
  }

  const handleRestart = () => {
    const engine = gameEngineRef.current
    if (!engine) return

    engine.reset()
    engine.start()
    setGameState(GameState.PLAYING)
  }

  const handleBackToMenu = () => {
    setGameState(GameState.MENU)
    setPlayerName('')
  }

  return (
    <div className={styles.wrapper}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width='950'
        height='560'
      />

      {/* Start Menu */}
      <form
        onSubmit={handleStartGame}
        className={cn(styles.canvas__form, {
          [styles.active]: gameState === GameState.MENU,
        })}
      >
        <h2 className={styles.canvas__form_title}>Runner Game</h2>
        <input
          type='text'
          className={styles.canvas__form_input}
          placeholder='Enter your name'
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          required
          autoFocus
        />
        <div className={styles.canvas__form_controls}>
          <p>↑ or Space - Jump</p>
          <p>↓ - Duck</p>
          <p>← → or A D - Move Left/Right</p>
          <p>ESC - Pause</p>
        </div>
        <button type='submit' className={styles.canvas__form_button}>
          Start Game
        </button>
        <p className={styles.canvas__form_text}>v1.0.0</p>
        <p className={styles.canvas__score_description}>
          <a
            className={styles.canvas__score_link}
            href='https://benniks1.github.io/my_game/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Original game
          </a>
          <span> / </span>
          <a
            className={styles.canvas__score_link}
            href='https://github.com/BenNiks1/my_game'
            target='_blank'
            rel='noopener noreferrer'
          >
            Game GitHub
          </a>
        </p>
      </form>

      {/* Game Over Screen */}
      <div
        className={cn(styles.canvas__score, {
          [styles.active]: gameState === GameState.GAME_OVER,
        })}
      >
        <div className={styles.canvas__score_inner}>
          <h2>Game Over, {playerName}!</h2>
          <br />
          <p className={styles.canvas__score_stats}>
            Your Score: <strong>{gameEngineRef.current?.score || 0}</strong>
          </p>
          <p className={styles.canvas__score_stats}>
            Best Score: <strong>{gameEngineRef.current?.highScore || 0}</strong>
          </p>
          <br />
          <div className={styles.canvas__score_buttons}>
            <button
              onClick={handleRestart}
              className={styles.canvas__score_button}
            >
              Play Again
            </button>
            <button
              onClick={handleBackToMenu}
              className={styles.canvas__score_button}
            >
              Main Menu
            </button>
          </div>
          <br />
          <p className={styles.canvas__score_description}>
            <a
              className={styles.canvas__score_link}
              href='https://benniks1.github.io/my_game/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Original game
            </a>
            <span> / </span>
            <a
              className={styles.canvas__score_link}
              href='https://github.com/BenNiks1/my_game'
              target='_blank'
              rel='noopener noreferrer'
            >
              Game GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
