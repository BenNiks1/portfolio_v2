import { StartIcon } from "../../model/start";
import { AppActions, AppActionTypes } from "../types";

interface AppState {
  activeIcon: number;
  activeStartIcon: number;
  activeWindow: StartIcon[];
}

const initialState: AppState = {
  activeIcon: 0,
  activeStartIcon: 0,
  activeWindow: [],
};

export const appReducer = (
  state = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_ACTIVE_ICON:
      return { ...state, activeIcon: action.payload };
    case AppActionTypes.SET_ACTIVE_WINDOW:
      return {
        ...state,
        activeWindow: action.payload,
      };
    case AppActionTypes.SET_ACTIVE_START_ICON:
      return { ...state, activeStartIcon: action.payload };
    default:
      return state;
  }
};
