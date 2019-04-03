import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Settings } from "./settings/types";
import settingsReducer from "./settings/reducers";
import { Annoys } from "./annoys/types";
import annoysReducer from "./annoys/reducers";

const rootReducer = combineReducers({
  settings: settingsReducer,
  annoys: annoysReducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

export interface State {
  settings: Settings;
  annoys: Annoys;
}

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
