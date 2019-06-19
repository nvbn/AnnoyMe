import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Navigator from "./navigation/Navigator";
import StorageService from "./services/storage";
import SettingsService from "./services/settings";
import TasksService from "./services/tasks";
import { ServicesContext } from "./contexts";
import * as constants from "./constants";

const settingsStorageService = new StorageService(
  AsyncStorage,
  constants.STORAGE_SETTINGS_KEY,
);
const settingsService = new SettingsService(settingsStorageService);

const tasksStorageService = new StorageService(
  AsyncStorage,
  constants.STORAGE_TASKS_KEY,
);
const tasksService = new TasksService(tasksStorageService);

export default () => (
  <ServicesContext.Provider value={{ tasksService, settingsService }}>
    <Navigator />
  </ServicesContext.Provider>
);
