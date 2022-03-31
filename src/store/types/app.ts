import { StartIcon } from "../../model/start";

export enum AppActionTypes {
  SET_ACTIVE_WINDOW = "SET_ACTIVE_WINDOW",
  SET_ACTIVE_ICON = "SET_ACTIVE_ICON",
  SET_ACTIVE_START_ICON = "SET_ACTIVE_START_ICON",
}

export type AppActions = setActiveWindow | setActiveIcon | setActiveStartIcon;

export interface setActiveIcon {
  type: AppActionTypes.SET_ACTIVE_ICON;
  payload: number;
}
export interface setActiveWindow {
  type: AppActionTypes.SET_ACTIVE_WINDOW;
  payload: StartIcon[];
}

export interface setActiveStartIcon {
  type: AppActionTypes.SET_ACTIVE_START_ICON;
  payload: number;
}
