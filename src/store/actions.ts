import { Dispatch } from "redux";
import { AppActions, AppActionTypes } from "./types";
import { store } from "./index";

export const setActiveWindow =
  (value: number) => (dispatch: Dispatch<AppActions>) => {
    const activeWindow = store.getState().app.activeWindow;
    if (!activeWindow.includes(value!)) {
      return dispatch({
        type: AppActionTypes.SET_ACTIVE_WINDOW,
        payload: activeWindow.concat(value),
      });
    } else {
      return dispatch({
        type: AppActionTypes.SET_ACTIVE_WINDOW,
        payload: activeWindow.filter((index: number) => index !== value),
      });
    }
  };

export const setActiveIcon =
  (value: number) => (dispatch: Dispatch<AppActions>) =>
    dispatch({
      type: AppActionTypes.SET_ACTIVE_ICON,
      payload: value,
    });
