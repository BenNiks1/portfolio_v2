import { Dispatch } from 'redux'
import { AppActions, AppActionTypes } from './types'
import { store } from './index'
import { StartIcon } from '../model/start'

export const setActiveWindow =
  (data: StartIcon) => (dispatch: Dispatch<AppActions>) => {
    const activeWindow = store.getState().app.activeWindow
    if (activeWindow.some((el: StartIcon) => el.id === data.id)) {
      return dispatch({
        type: AppActionTypes.SET_ACTIVE_WINDOW,
        payload: activeWindow.filter((el: StartIcon) => el.id !== data.id),
      })
    } else {
      return dispatch({
        type: AppActionTypes.SET_ACTIVE_WINDOW,
        payload: activeWindow.concat(data),
      })
    }
  }

export const setActiveIcon =
  (value: number) => (dispatch: Dispatch<AppActions>) =>
    dispatch({
      type: AppActionTypes.SET_ACTIVE_ICON,
      payload: value,
    })

export const setActiveStartIcon =
  (value: number) => (dispatch: Dispatch<AppActions>) =>
    dispatch({
      type: AppActionTypes.SET_ACTIVE_START_ICON,
      payload: value,
    })
