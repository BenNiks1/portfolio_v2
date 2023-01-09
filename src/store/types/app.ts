import { StartIcon } from '../../model'

export enum AppActionTypes {
  SET_ACTIVE_WINDOW = 'SET_ACTIVE_WINDOW',
  SET_ACTIVE_ICON = 'SET_ACTIVE_ICON',
  SET_ACTIVE_START_ICON = 'SET_ACTIVE_START_ICON',
  SET_MINIMIZE_WINDOW = 'SET_MINIMIZE_WINDOW',
  SET_EXPAND_WINDOW = 'SET_EXPAND_WINDOW',
  SET_POWER_STATUS = 'SET_POWER_STATUS',
  CLEAR_ACTIVE_WINDOWS = 'CLEAR_ACTIVE_WINDOWS',
}

export type AppActions =
  | setActiveWindow
  | setActiveIcon
  | setActiveStartIcon
  | setMinimizeWindow
  | setExpandWindow
  | setPowerStatus
  | clearActiveWindows

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
