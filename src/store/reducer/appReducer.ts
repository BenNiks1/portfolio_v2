import { AppActions, AppActionTypes } from "../types";

interface AppState {
  activeWindow: number;
  isIconClicked: boolean;
}

const initialState: AppState = {
  activeWindow: 0,
  isIconClicked: false,
};

export const appReducer = (
  state = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_ACTIVE_WINDOW:
      return { ...state, activeWindow: action.payload };
    case AppActionTypes.SET_CLICKED_ICON:
      return { ...state, isIconClicked: action.payload };
    default:
      return state;
  }
};
