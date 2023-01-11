import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './Game.module.scss'
import bg from '../../assets/game/background.png'
import playerFrame from '../../assets/game/hero/player.png'
import playerSitFrame from '../../assets/game/hero/sit.png'
import playerJumpFrame from '../../assets/game/hero/jump.png'
import barrier from '../../assets/game/enemy/commonEnemy/enemy.png'
import {
  COLUMNS_NUMBER,
  ENEMY_COLUMN_COUNT,
  ENEMY_IMG_HEIGHT,
  ENEMY_IMG_WIDTH,
  ENEMY_ROWS_COUNT,
  ENEMY_SPEED,
  JUMP_LENGTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  ROWS_NUMBER,
} from './constants'

export const Game = () => {
  const [start, setStar] = useState(false)
  const [userName, setUserName] = useState('')

  let currentFrame = 0
  const canvas = useRef()
  let isDownPressed = false
  let isUpPressed = false
  console.log('userName', userName)

  let cameraSpeed = 0
  let cameraX = 0

  const draw = ctx => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    drawBackground(ctx)
    drawPlayer(ctx)
    drawBarrier(ctx, 65)

    cameraX = cameraSpeed - canvas.current.width / 2
  }
  const player = new Image()
  const enemy = new Image()

  player.src = playerFrame
  enemy.src = barrier

  let jumpCount = 0
  let jumpHeight = 0

  let enemyFrame = 0
  let enemyX = canvas.current?.width + 20
  let enemyY = canvas.current?.height - 65
  const drawBarrier = ctx => {
    let frameWidth = ENEMY_IMG_WIDTH / ENEMY_COLUMN_COUNT
    let frameHeight = ENEMY_IMG_HEIGHT / ENEMY_ROWS_COUNT
    enemyFrame++
    enemyX -= ENEMY_SPEED
    if (enemyX <= -60) {
      enemyX = Math.floor(Math.random() * 1300 + 1000)
    }
    let maxFrame = ENEMY_COLUMN_COUNT * ENEMY_ROWS_COUNT
    if (enemyFrame > maxFrame) {
      enemyFrame = 0
    }
    let column = enemyFrame % ENEMY_ROWS_COUNT
    let row = Math.floor(enemyFrame / ENEMY_COLUMN_COUNT)
    ctx.drawImage(
      enemy,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      enemyX,
      enemyY,
      frameWidth,
      frameHeight
    )
  }

  const drawPlayer = ctx => {
    let frameWidth = 1500 / COLUMNS_NUMBER
    let frameHeight = 784 / ROWS_NUMBER
    let playerX = (canvas.current.width - PLAYER_WIDTH) / 6
    let playerY = canvas.current.height
    currentFrame++
    const maxFrame = COLUMNS_NUMBER * ROWS_NUMBER - 1
    if (currentFrame > maxFrame) {
      currentFrame = 0
    }

    const column = currentFrame % COLUMNS_NUMBER
    const row = Math.floor(currentFrame / COLUMNS_NUMBER)
    // sit
    if (isDownPressed && !isUpPressed) {
      player.src = playerSitFrame
      playerY = canvas.current.height + 30 - frameHeight
    } else {
      player.src = playerFrame
      playerY = canvas.current.height - PLAYER_HEIGHT
    }
    // jump
    if (isUpPressed) {
      player.src = playerJumpFrame
      jumpCount++
      jumpHeight =
        2 * JUMP_LENGTH * Math.sin((Math.PI * jumpCount) / JUMP_LENGTH)
    }
    if (jumpCount > JUMP_LENGTH) {
      player.src = playerFrame
      jumpCount = 0
      isUpPressed = false
      jumpHeight = 0
    }
    // drawImage
    ctx.drawImage(
      player,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      playerX,
      playerY - jumpHeight,
      frameWidth,
      frameHeight
    )
  }
  const drawBackground = ctx => {
    const background = new Image()
    background.src = bg
    const bgWidth = 982

    const bgX =
      Math.floor(cameraX / background.width) * background.width -
      (cameraX % background.width)
    const count = Math.ceil(canvas.current.width / bgWidth) + 2

    cameraSpeed++
    for (let i = 0; i < count; i++) {
      ctx.drawImage(
        background,
        bgX + i * bgWidth - cameraX,
        0,
        bgWidth,
        canvas.current.height
      )
    }
  }
  const startGame = e => {
    e.preventDefault()
    setUserName(e.target[0].value)
    setStar(true)
  }

  const keyDownHandler = e => {
    // up arrow
    if (e.keyCode == 38) {
      isUpPressed = true
    }
    // down arrow
    if (e.keyCode == 40) {
      isDownPressed = true
    }
  }
  const keyUpHandler = e => {
    if (e.keyCode == 40) {
      isDownPressed = false
    }
  }
  window.addEventListener('keydown', keyDownHandler)
  window.addEventListener('keyup', keyUpHandler)

  useEffect(() => {
    const context = canvas.current.getContext('2d')

    let animationFrameId
    //Our draw came here
    const render = () => {
      if (start) {
        draw(context)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [canvas, start])
  return (
    <div className={styles.wrapper}>
      <canvas
        className={styles.canvas}
        id='myGame'
        ref={canvas}
        width='982'
        height='600'
      />
      <form
        onSubmit={startGame}
        className={cn(styles.canvas__form, { [styles.active]: !start })}
      >
        <input
          type='text'
          className={styles.canvas__form_input}
          placeholder='enter your name'
          required
          autoFocus
        />
        <p className={styles.canvas__form_text}>Press 'Enter' to start</p>
      </form>
      <div className={styles.canvas__score}>
        <div className={styles.canvas__score_inner} />
      </div>
    </div>
  )
}
