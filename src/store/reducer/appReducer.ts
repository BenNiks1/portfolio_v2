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
}

const initialState: AppState = {
  activeIcon: 0,
  activeStartIcon: 1,
  minimizeWindow: [],
  expandWindow: [],
  activeWindow: [{ id: 1, label: 'My Computer' }],
  powerStatus: localStorage.getItem('powerStatus') || POWER_STATUS_START,
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
    default:
      return state
  }
}
