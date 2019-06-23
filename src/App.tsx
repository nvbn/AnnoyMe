import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import * as configurations from "./constants/configurations";
import * as defaults from "./constants/defaults";
import { ConfigurationContext, ServicesContext } from "./contexts";
import Navigator from "./Navigator";
import SettingsRepository from "./services/settingsRepository";
import StorageService from "./services/storage";
import TasksRepository from "./services/tasksRepository";

const settingsStorageService = new StorageService(
  AsyncStorage,
  configurations.STORAGE_SETTINGS_KEY,
);
const settingsRepository = new SettingsRepository(
  settingsStorageService,
  defaults.DEFAULT_SETTINGS,
);

const tasksStorageService = new StorageService(
  AsyncStorage,
  configurations.STORAGE_TASKS_KEY,
);
const tasksRepository = new TasksRepository(
  tasksStorageService,
  defaults.DEFAULT_TASKS,
);

export default () => (
  <ConfigurationContext.Provider
    value={{ refreshInterval: configurations.REFRESH_INTERVAL }}
  >
    <ServicesContext.Provider
      value={{
        tasksRepository,
        settingsRepository,
      }}
    >
      <Navigator />
    </ServicesContext.Provider>
  </ConfigurationContext.Provider>
);
