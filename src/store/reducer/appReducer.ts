import { StartIcon } from '../../model'
import { POWER_STATUS_START } from '../../utils'
import { AppActions, AppActionTypes } from '../types'

interface AppState {
  activeIcon: number
  activeStartIcon: number
  minimizeWindow: number[]
  expandWindow: number[]
  activeWindow: StartIcon[]
  powerStatus: string
  theme: 'light' | 'dark'
  language: 'en' | 'ru'
}

const initialState: AppState = {
  activeIcon: 0,
  activeStartIcon: 1,
  minimizeWindow: [],
  expandWindow: [],
  activeWindow: [{ id: 1, label: 'My Computer' }],
  powerStatus: localStorage.getItem('powerStatus') || POWER_STATUS_START,
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  language: (localStorage.getItem('language') as 'en' | 'ru') || 'en',
}

export const appReducer = (
  state = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_ACTIVE_ICON:
      return { ...state, activeIcon: action.payload }
    case AppActionTypes.SET_ACTIVE_WINDOW:
      return {
        ...state,
        activeWindow: action.payload,
      }
    case AppActionTypes.CLEAR_ACTIVE_WINDOWS:
      return { ...state, activeWindow: [] }
    case AppActionTypes.SET_ACTIVE_START_ICON:
      return { ...state, activeStartIcon: action.payload }
    case AppActionTypes.SET_MINIMIZE_WINDOW:
      return { ...state, minimizeWindow: action.payload }
    case AppActionTypes.SET_EXPAND_WINDOW:
      return { ...state, expandWindow: action.payload }
    case AppActionTypes.SET_POWER_STATUS:
      return { ...state, powerStatus: action.payload }
    case AppActionTypes.SET_THEME:
      localStorage.setItem('theme', action.payload)
      return { ...state, theme: action.payload }
    case AppActionTypes.SET_LANGUAGE:
      localStorage.setItem('language', action.payload)
      return { ...state, language: action.payload }
    case AppActionTypes.RESET_SETTINGS:
      localStorage.setItem('theme', 'light')
      localStorage.setItem('language', 'en')
      return { ...state, theme: 'light', language: 'en' }
    default:
      return state
  }
}
