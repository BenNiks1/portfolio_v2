export enum AppActionTypes {
  SET_ACTIVE_WINDOW = "SET_ACTIVE_WINDOW",
  SET_ACTIVE_ICON = "SET_ACTIVE_ICON",
}

export type AppActions = setActiveWindow | setActiveIcon;

export interface setActiveIcon {
  type: AppActionTypes.SET_ACTIVE_ICON;
  payload: number;
}
export interface setActiveWindow {
  type: AppActionTypes.SET_ACTIVE_WINDOW;
  payload: number[];
}
