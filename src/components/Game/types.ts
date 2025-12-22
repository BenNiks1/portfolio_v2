export interface GameSettings {
  cameraSpeed: number
  cameraX: number
  difficulty: number
}

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
}

export interface PlayerState {
  isJumping: boolean
  isDucking: boolean
  isHit: boolean
  jumpCount: number
  jumpHeight: number
  moveSpeed: number
}

export interface EnemyState {
  frame: number
  speed: number
  scored: boolean
  passed: boolean
  type: 'ground' | 'air'
}
