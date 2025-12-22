import { StartIcon } from '../../model'

export enum AppActionTypes {
  SET_ACTIVE_WINDOW = 'SET_ACTIVE_WINDOW',
  SET_ACTIVE_ICON = 'SET_ACTIVE_ICON',
  SET_ACTIVE_START_ICON = 'SET_ACTIVE_START_ICON',
  SET_MINIMIZE_WINDOW = 'SET_MINIMIZE_WINDOW',
  SET_EXPAND_WINDOW = 'SET_EXPAND_WINDOW',
  SET_POWER_STATUS = 'SET_POWER_STATUS',
  CLEAR_ACTIVE_WINDOWS = 'CLEAR_ACTIVE_WINDOWS',
  SET_THEME = 'SET_THEME',
  SET_LANGUAGE = 'SET_LANGUAGE',
  RESET_SETTINGS = 'RESET_SETTINGS',
}

export type AppActions =
  | setActiveWindow
  | setActiveIcon
  | setActiveStartIcon
  | setMinimizeWindow
  | setExpandWindow
  | setPowerStatus
  | clearActiveWindows
  | setTheme
  | setLanguage
  | resetSettings

export interface setActiveIcon {
  type: AppActionTypes.SET_ACTIVE_ICON
  payload: number
}
export interface setActiveWindow {
  type: AppActionTypes.SET_ACTIVE_WINDOW
  payload: StartIcon[]
}

export interface clearActiveWindows {
  type: AppActionTypes.CLEAR_ACTIVE_WINDOWS
  payload: []
}

export interface setActiveStartIcon {
  type: AppActionTypes.SET_ACTIVE_START_ICON
  payload: number
}

export interface setMinimizeWindow {
  type: AppActionTypes.SET_MINIMIZE_WINDOW
  payload: number[]
}

export interface setExpandWindow {
  type: AppActionTypes.SET_EXPAND_WINDOW
  payload: number[]
}

export interface setPowerStatus {
  type: AppActionTypes.SET_POWER_STATUS
  payload: string
}

export interface setTheme {
  type: AppActionTypes.SET_THEME
  payload: 'light' | 'dark'
}

export interface setLanguage {
  type: AppActionTypes.SET_LANGUAGE
  payload: 'en' | 'ru'
}

export interface resetSettings {
  type: AppActionTypes.RESET_SETTINGS
}
