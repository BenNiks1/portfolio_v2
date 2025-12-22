import {
  COLUMNS_NUMBER,
  ENEMY_COLUMN_COUNT,
  ENEMY_IMG_HEIGHT,
  ENEMY_IMG_WIDTH,
  ENEMY_ROWS_COUNT,
  ENEMY_SPEED,
  JUMP_LENGTH,
  PLAYER_HEIGHT,
  ROWS_NUMBER,
} from './constants'
import { GameSettings, Position, Size, PlayerState, EnemyState } from './types'

export class Player {
  position: Position
  size: Size
  state: PlayerState
  frameWidth: number
  frameHeight: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.frameWidth = 1500 / COLUMNS_NUMBER
    this.frameHeight = 784 / ROWS_NUMBER
    this.size = { width: this.frameWidth, height: this.frameHeight }
    this.position = {
      x: canvasWidth / 6,
      y: canvasHeight - PLAYER_HEIGHT,
    }
    this.state = {
      isJumping: false,
      isDucking: false,
      isHit: false,
      jumpCount: 0,
      jumpHeight: 0,
      moveSpeed: 0,
    }
  }

  moveLeft() {
    this.state.moveSpeed = -5
  }

  moveRight() {
    this.state.moveSpeed = 5
  }

  stopMoving() {
    this.state.moveSpeed = 0
  }

  jump() {
    if (!this.state.isJumping) {
      this.state.isJumping = true
      this.state.jumpCount = 0
    }
  }

  duck() {
    if (!this.state.isJumping) {
      this.state.isDucking = true
    }
  }

  stand() {
    this.state.isDucking = false
  }

  update(canvasHeight: number, canvasWidth: number) {
    this.position.x += this.state.moveSpeed

    const minX = 50
    const maxX = canvasWidth - this.frameWidth - 50
    if (this.position.x < minX) {
      this.position.x = minX
    } else if (this.position.x > maxX) {
      this.position.x = maxX
    }

    if (this.state.isJumping) {
      this.state.jumpCount++
      this.state.jumpHeight =
        2 *
        JUMP_LENGTH *
        Math.sin((Math.PI * this.state.jumpCount) / JUMP_LENGTH)

      if (this.state.jumpCount > JUMP_LENGTH) {
        this.state.isJumping = false
        this.state.jumpCount = 0
        this.state.jumpHeight = 0
      }
    }

    if (this.state.isDucking) {
      this.position.y = canvasHeight + 20 - this.frameHeight
    } else {
      this.position.y = canvasHeight - PLAYER_HEIGHT
    }
  }

  hit() {
    this.state.isHit = true
    setTimeout(() => {
      this.state.isHit = false
    }, 200)
  }

  getHitbox() {
    const hitboxPaddingX = 110
    const hitboxPaddingRight = 110
    const hitboxWidth = this.frameWidth - hitboxPaddingX - hitboxPaddingRight
    const hitboxHeight = 60
    const hitboxOffsetY = 20

    return {
      x: this.position.x + hitboxPaddingX,
      y:
        this.position.y -
        this.state.jumpHeight +
        this.frameHeight -
        hitboxHeight -
        hitboxOffsetY,
      width: hitboxWidth,
      height: hitboxHeight,
    }
  }
}

export class Enemy {
  position: Position
  state: EnemyState
  frameWidth: number
  frameHeight: number
  initialX: number

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    startDistance: number = 0,
    type: 'ground' | 'air' = 'ground'
  ) {
    this.frameWidth = ENEMY_IMG_WIDTH / ENEMY_COLUMN_COUNT
    this.frameHeight = ENEMY_IMG_HEIGHT / ENEMY_ROWS_COUNT

    const groundY = canvasHeight - 65
    const airY = canvasHeight - 180

    this.position = {
      x: canvasWidth + startDistance,
      y: type === 'air' ? airY : groundY,
    }
    this.initialX = canvasWidth
    this.state = {
      frame: 0,
      speed: ENEMY_SPEED,
      scored: false,
      passed: false,
      type: type,
    }
  }

  update(difficulty: number) {
    this.state.frame++
    const maxFrame = ENEMY_COLUMN_COUNT * ENEMY_ROWS_COUNT
    if (this.state.frame > maxFrame) {
      this.state.frame = 0
    }

    const speedMultiplier = 1 + difficulty * 0.1
    this.position.x -= this.state.speed * speedMultiplier
  }

  reset(canvasHeight: number) {
    const minDistance = 600
    const maxDistance = 1500
    const randomDistance = Math.floor(
      Math.random() * (maxDistance - minDistance) + minDistance
    )
    this.position.x = randomDistance

    const newType = Math.random() > 0.5 ? 'ground' : 'air'
    this.state.type = newType

    const groundY = canvasHeight - 65
    const airY = canvasHeight - 180
    this.position.y = newType === 'air' ? airY : groundY

    this.state.scored = false
    this.state.passed = false
  }

  getHitbox() {
    const hitboxPaddingX = 20
    const hitboxPaddingRight = 20
    const hitboxWidth = this.frameWidth - hitboxPaddingX - hitboxPaddingRight
    const hitboxHeight = 50
    const hitboxOffsetY = 15

    return {
      x: this.position.x + hitboxPaddingX,
      y: this.position.y + hitboxOffsetY,
      width: hitboxWidth,
      height: hitboxHeight,
    }
  }
}

export class GameEngine {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  player: Player
  enemies: Enemy[]
  settings: GameSettings
  life: number
  score: number
  highScore: number
  isRunning: boolean
  isPaused: boolean
  animationId: number | null
  currentFrame: number
  debugMode: boolean

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.player = new Player(canvas.width, canvas.height)
    this.enemies = []
    this.settings = {
      cameraSpeed: 0,
      cameraX: 0,
      difficulty: 0,
    }
    this.life = 3
    this.score = 0
    this.highScore = parseInt(localStorage.getItem('gameHighScore') || '0')
    this.isRunning = false
    this.isPaused = false
    this.animationId = null
    this.currentFrame = 0
    this.debugMode = false
    this.initEnemies()
  }

  drawHitboxes(ctx: CanvasRenderingContext2D) {
    if (!this.debugMode) return

    const playerBox = this.player.getHitbox()
    ctx.strokeStyle = 'lime'
    ctx.lineWidth = 2
    ctx.strokeRect(playerBox.x, playerBox.y, playerBox.width, playerBox.height)

    this.enemies.forEach(enemy => {
      const enemyBox = enemy.getHitbox()
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      ctx.strokeRect(enemyBox.x, enemyBox.y, enemyBox.width, enemyBox.height)
    })
  }

  initEnemies() {
    const enemyConfigs = [
      { distance: 1000, type: 'ground' as const },
      { distance: 1800, type: 'air' as const },
      { distance: 2400, type: 'ground' as const },
      { distance: 3200, type: 'air' as const },
    ]
    this.enemies = enemyConfigs.map(
      config =>
        new Enemy(
          this.canvas.width,
          this.canvas.height,
          config.distance,
          config.type
        )
    )
  }

  start() {
    this.isRunning = true
    this.isPaused = false
    this.life = 3
    this.score = 0
    this.settings.difficulty = 0
    this.initEnemies()
  }

  pause() {
    this.isPaused = !this.isPaused
  }

  stop() {
    this.isRunning = false
    if (this.score > this.highScore) {
      this.highScore = this.score
      localStorage.setItem('gameHighScore', this.score.toString())
    }
  }

  reset() {
    this.player = new Player(this.canvas.width, this.canvas.height)
    this.settings = {
      cameraSpeed: 0,
      cameraX: 0,
      difficulty: 0,
    }
    this.life = 3
    this.score = 0
    this.currentFrame = 0
    this.initEnemies()
  }

  checkCollision(enemy: Enemy): boolean {
    const playerBox = this.player.getHitbox()
    const enemyBox = enemy.getHitbox()

    return (
      playerBox.x < enemyBox.x + enemyBox.width &&
      playerBox.x + playerBox.width > enemyBox.x &&
      playerBox.y < enemyBox.y + enemyBox.height &&
      playerBox.y + playerBox.height > enemyBox.y
    )
  }

  updateScore(enemy: Enemy) {
    const playerCenterX = this.player.position.x + this.player.frameWidth / 2
    const enemyRightEdge = enemy.position.x + enemy.frameWidth

    if (enemyRightEdge < playerCenterX && !enemy.state.scored) {
      enemy.state.scored = true
      this.score++
      if (this.score % 5 === 0) {
        this.settings.difficulty++
      }
    }
  }

  update() {
    if (!this.isRunning || this.isPaused) return

    this.player.update(this.canvas.height, this.canvas.width)

    this.enemies.forEach(enemy => {
      enemy.update(this.settings.difficulty)

      if (enemy.position.x <= -60) {
        enemy.reset(this.canvas.height)
      }

      if (this.checkCollision(enemy) && !this.player.state.isHit) {
        this.player.hit()
        this.life--
        if (this.life <= 0) {
          this.stop()
        }
      }

      this.updateScore(enemy)
    })

    this.settings.cameraSpeed++
    this.settings.cameraX = this.settings.cameraSpeed - this.canvas.width / 2
    this.currentFrame++
  }
}
