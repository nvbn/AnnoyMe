import React from "react";
import { AsyncStorage } from "react-native";
import Tasks from "./tasks";
import Settings from "./settings";

export default React.createContext({
  tasksService: new Tasks(AsyncStorage),
  settingsService: new Settings(AsyncStorage),
});
