import { AppActions, AppActionTypes } from "../types";

interface AppState {
  activeIcon: number;
  activeWindow: number[];
}

const initialState: AppState = {
  activeIcon: 0,
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

    default:
      return state;
  }
};
