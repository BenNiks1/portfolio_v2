import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './Game.module.scss'
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

// Игра изначалоно написана на нативном js
// опыта с canvas на react.js практически нет
// TODO: требуется рефакторинг
export const Game = () => {
  const [game, setGame] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [enemy, setEnemy] = useState()
  const [player, setPlayer] = useState()
  const [settings, setSettings] = useState()
  const [userName, setUserName] = useState('')
  const [key, setKey] = useState()
  const [userScore, setUserScore] = useState([])

  const canvas = useRef()
  let animationFrameId
  let currentFrame = 0
  let isDownPressed = false
  let isUpPressed = false
  let collisionHandler = false
  let life = 3
  let score = 0

  const playerImage = new Image()
  const enemyImage = new Image()

  playerImage.src = playerFrame
  enemyImage.src = barrier

  const draw = ctx => {
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    drawBackground(ctx)
    drawPlayer(ctx)
    drawEnemy(ctx)
    drawLife(ctx)
    drawScore(ctx)
    collision()

    settings.cameraX = settings.cameraSpeed - canvas.current.width / 2

    if (life <= 0) {
      addUserScore()
      setGame(false)
      setIsGameOver(true)
      clearInterval(draw())
    }
  }

  const addUserScore = () => {
    const sortByField = field => (a, b) => a[field] > b[field] ? -1 : 1
    const result = JSON.parse(localStorage.getItem('result') || '[]')
    result.sort(sortByField('score'))
    const user = {
      name: userName,
      score,
      key,
    }

    setUserScore([user, ...result])

    localStorage.setItem('result', JSON.stringify(userScore))
  }

  const collision = () => {
    if (
      enemy.x + 15 + enemy.frameWidth - 25 >= player.x + 95 &&
      enemy.x + 15 + enemy.frameWidth - 25 <=
        player.x + 95 + player.frameWidth - 195 &&
      enemy.y + 55 >= player.y - player.jumpHeight + player.frameHeight - 80 &&
      enemy.y + 55 - enemy.frameHeight - 15 <=
        player.y - player.jumpHeight + player.frameHeight - 80
    ) {
      collisionHandler = true
      playerImage.src = playerHit
      life = life - 1 / 16

      setTimeout(() => {
        playerImage.src = playerFrame
        life = Math.floor(life)
      }, 200)
    } else if (
      enemy.x + 15 + enemy.frameWidth - 25 >= player.x + 95 &&
      enemy.x + 15 <= player.x + 95
    ) {
      score++
    }
  }
  const drawEnemy = ctx => {
    enemy.frame++
    enemy.x -= ENEMY_SPEED
    if (enemy.x <= -60) {
      enemy.x = Math.floor(Math.random() * 1300 + 1000)
    }
    let maxFrame = ENEMY_COLUMN_COUNT * ENEMY_ROWS_COUNT
    if (enemy.frame > maxFrame) {
      enemy.frame = 0
    }
    let column = enemy.frame % ENEMY_ROWS_COUNT
    let row = Math.floor(enemy.frame / ENEMY_COLUMN_COUNT)
    ctx.drawImage(
      enemyImage,
      column * enemy.frameWidth,
      row * enemy.frameHeight,
      enemy.frameWidth,
      enemy.frameHeight,
      enemy.x,
      enemy.y,
      enemy.frameWidth,
      enemy.frameHeight
    )
  }

  const drawPlayer = ctx => {
    currentFrame++
    const maxFrame = COLUMNS_NUMBER * ROWS_NUMBER - 1
    if (currentFrame > maxFrame) {
      currentFrame = 0
    }

    const column = currentFrame % COLUMNS_NUMBER
    const row = Math.floor(currentFrame / COLUMNS_NUMBER)
    // sit
    if (isDownPressed && !isUpPressed) {
      playerImage.src = playerSitFrame
      player.y = canvas.current.height + 20 - player.frameHeight
    } else if (!collisionHandler && !isDownPressed) {
      playerImage.src = playerFrame
      player.y = canvas.current.height - PLAYER_HEIGHT
    }
    // jump
    if (isUpPressed) {
      playerImage.src = playerJumpFrame
      player.jumpCount++
      player.jumpHeight =
        2 * JUMP_LENGTH * Math.sin((Math.PI * player.jumpCount) / JUMP_LENGTH)
    }
    if (player.jumpCount > JUMP_LENGTH) {
      playerImage.src = playerFrame
      player.jumpCount = 0
      isUpPressed = false
      player.jumpHeight = 0
    }
    // drawImage
    ctx.drawImage(
      playerImage,
      column * player.frameWidth,
      row * player.frameHeight,
      player.frameWidth,
      player.frameHeight,
      player.x,
      player.y - player.jumpHeight,
      player.frameWidth,
      player.frameHeight
    )
  }
  const drawBackground = ctx => {
    const background = new Image()
    background.src = bg
    const bgWidth = 982

    const bgX =
      Math.floor(settings.cameraX / background.width) * background.width -
      (settings.cameraX % background.width)
    const count = Math.ceil(canvas.current.width / bgWidth) + 2

    settings.cameraSpeed++
    for (let i = 0; i < count; i++) {
      ctx.drawImage(
        background,
        bgX + i * bgWidth - settings.cameraX,
        0,
        bgWidth,
        canvas.current.height
      )
    }
  }
  const startGame = e => {
    e.preventDefault()
    setUserName(e.target[0].value)
    setGame(true)
  }

  const drawScore = ctx => {
    ctx.font = '16px Arial'
    ctx.fillStyle = '#fff'
    ctx.fillText(`Score: ${score}`, 8, 20)
  }

  const drawLife = ctx => {
    const lifeImage = new Image()

    switch (life) {
      case 3:
        lifeImage.src = threeHearts
        ctx.drawImage(lifeImage, 20, 40, 54, 16)
        break
      case 2:
        lifeImage.src = twoHearts
        ctx.drawImage(lifeImage, 20, 40, 54, 16)
        break
      case 1:
        lifeImage.src = oneHeart
        ctx.drawImage(lifeImage, 20, 40, 54, 16)
        break
      case 0:
        lifeImage.src = zeroHearts
        ctx.drawImage(lifeImage, 20, 40, 54, 16)
        break
    }
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

    setKey(new Date())

    setSettings({
      cameraSpeed: 0,
      cameraX: 0,
    })

    setPlayer({
      frameWidth: 1500 / COLUMNS_NUMBER,
      frameHeight: 784 / ROWS_NUMBER,
      x: (canvas.current?.width - PLAYER_WIDTH) / 6,
      y: canvas.current?.height,
      jumpCount: 0,
      jumpHeight: 0,
    })

    setEnemy({
      frame: 0,
      frameWidth: ENEMY_IMG_WIDTH / ENEMY_COLUMN_COUNT,
      frameHeight: ENEMY_IMG_HEIGHT / ENEMY_ROWS_COUNT,
      x: canvas.current?.width + 20,
      y: canvas.current?.height - 65,
    })

    //Our draw came here
    const render = () => {
      if (game) {
        draw(context)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [canvas, game])
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
        className={cn(styles.canvas__form, {
          [styles.active]: !game && !isGameOver,
        })}
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
      <div
        className={cn(styles.canvas__score, { [styles.active]: isGameOver })}
      >
        <div className={styles.canvas__score_inner}>
          {userScore.map((user, index) => (
            <p key={index}>
              {index + 1}. {user.name} - {user.score}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
