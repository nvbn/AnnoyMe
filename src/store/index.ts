import { createStore, combineReducers } from "redux";
import { Settings } from "./settings/types";
import settingsReducer from "./settings/reducers";
import { Annoys } from "./annoys/types";
import annoysReducer from "./annoys/reducers";

const rootReducer = combineReducers({
  settings: settingsReducer,
  annoys: annoysReducer,
});

export interface State {
  settings: Settings;
  annoys: Annoys;
}

export default createStore(rootReducer);
