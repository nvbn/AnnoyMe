import { createStore, combineReducers } from "redux";
import { Settings } from "./settings/types";
import settingsReducer from "./settings/reducers";

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export interface State {
  settings: Settings;
}

export default createStore(rootReducer);
