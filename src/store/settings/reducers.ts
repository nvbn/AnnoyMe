import * as constants from "../../constants";
import {
  Settings,
  SettingsActionTypes,
  SET_START_HOUR,
  SET_END_HOUR,
  SET_FREQUENCY,
} from "./types";

const initialState: Settings = {
  startHour: constants.DEFAULT_START_HOUR,
  endHour: constants.DEFAULT_END_HOUR,
  frequency: constants.DEFAULT_FREQUENCY,
};

export default (
  state = initialState,
  action: SettingsActionTypes,
): Settings => {
  switch (action.type) {
    case SET_START_HOUR:
      return {
        ...state,
        startHour: action.value,
      };
    case SET_END_HOUR:
      return {
        ...state,
        endHour: action.value,
      };
    case SET_FREQUENCY:
      return {
        ...state,
        frequency: action.value,
      };
    default:
      return state;
  }
};
