import { Dispatch } from "redux";
import { AppActions, AppActionTypes } from "./types";

export const setActiveWindow =
  (value: number) => (dispatch: Dispatch<AppActions>) =>
    dispatch({
      type: AppActionTypes.SET_ACTIVE_WINDOW,
      payload: value,
    });

export const setClickedIcon =
  (value: boolean) => (dispatch: Dispatch<AppActions>) =>
    dispatch({
      type: AppActionTypes.SET_CLICKED_ICON,
      payload: value,
    });
