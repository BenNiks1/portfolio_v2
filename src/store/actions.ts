import { Dispatch } from 'redux'
import { AppActions, AppActionTypes } from './types'
import { store } from './index'
import { StartIcon } from '../model'

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

export const clearActiveWindows = () => (dispatch: Dispatch<AppActions>) =>
  dispatch({
    type: AppActionTypes.CLEAR_ACTIVE_WINDOWS,
    payload: [],
  })

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

export const setMinimizeWindow =
  (value: number) => (dispatch: Dispatch<AppActions>) => {
    const minimizeWindow = store.getState().app.minimizeWindow
    if (minimizeWindow.includes(value)) {
      return dispatch({
        type: AppActionTypes.SET_MINIMIZE_WINDOW,
        payload: minimizeWindow.filter((el: number) => el !== value),
      })
    } else {
      return dispatch({
        type: AppActionTypes.SET_MINIMIZE_WINDOW,
        payload: minimizeWindow.concat(value),
      })
    }
  }

export const setExpandWindow =
  (value: number) => (dispatch: Dispatch<AppActions>) => {
    const expandWindow = store.getState().app.expandWindow
    if (expandWindow.includes(value)) {
      return dispatch({
        type: AppActionTypes.SET_EXPAND_WINDOW,
        payload: expandWindow.filter((el: number) => el !== value),
      })
    } else {
      return dispatch({
        type: AppActionTypes.SET_EXPAND_WINDOW,
        payload: expandWindow.concat(value),
      })
    }
  }

export const setPowerStatus =
  (value: string) => (dispatch: Dispatch<AppActions>) =>
    dispatch({
      type: AppActionTypes.SET_POWER_STATUS,
      payload: value,
    })
