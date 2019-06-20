import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Navigator from "./navigation/Navigator";
import StorageService from "./services/storage";
import SettingsRepository from "./services/settingsRepository";
import SettingsValidator from "./services/settingsValidator";
import TasksRepository from "./services/tasksRepository";
import TaskValidator from "./services/taskValidator";
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
const settingsValidator = new SettingsValidator(
  configurations.MIN_FREQUENCY,
  configurations.MAX_FREQUENCY,
);

const tasksStorageService = new StorageService(
  AsyncStorage,
  configurations.STORAGE_TASKS_KEY,
);
const tasksRepository = new TasksRepository(
  tasksStorageService,
  defaults.DEFAULT_TASKS,
);
const taskValidator = new TaskValidator();

export default () => (
  <ConfigurationContext.Provider
    value={{ refreshInterval: configurations.REFRESH_INTERVAL }}
  >
    <ServicesContext.Provider
      value={{
        tasksRepository,
        taskValidator,
        settingsRepository,
        settingsValidator,
      }}
    >
      <Navigator />
    </ServicesContext.Provider>
  </ConfigurationContext.Provider>
);
