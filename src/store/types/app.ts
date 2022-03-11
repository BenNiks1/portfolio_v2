export enum AppActionTypes {
  SET_ACTIVE_WINDOW = "SET_ACTIVE_WINDOW",
  SET_CLICKED_ICON = "SET_CLICKED_ICON",
}

export type AppActions = setActiveWindow | setClickedIcon;

export interface setActiveWindow {
  type: AppActionTypes.SET_ACTIVE_WINDOW;
  payload: number;
}

export interface setClickedIcon {
  type: AppActionTypes.SET_CLICKED_ICON;
  payload: boolean;
}
