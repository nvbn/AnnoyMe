import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Navigator from "./navigation/Navigator";
import StorageService from "./services/storage";
import SettingsRepository from "./services/settingsRepository";
import TasksRepository from "./services/tasksRepository";
import { ServicesContext, ConfigurationContext } from "./contexts";
import * as defaults from "./constants/defaults";
import * as configurations from "./constants/configurations";

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
