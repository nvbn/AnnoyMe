import React from "react";
import ITasksRepository from "./services/tasksRepository/ITasksReposiotry";
import ITaskValidator from "./services/taskValidator/ITaskValidator";
import ISettingsRepository from "./services/settingsRepository/ISettingsRepository";
import ISettingsValidator from "./services/settingsValidator/ISettingsValidator";

interface ServicesContextProps {
  tasksRepository: ITasksRepository;
  taskValidator: ITaskValidator;
  settingsRepository: ISettingsRepository;
  settingsValidator: ISettingsValidator;
}

export const ServicesContext = React.createContext<ServicesContextProps>(
  {} as ServicesContextProps,
);

interface ConfigurationContextProps {
  refreshInterval: number;
}

export const ConfigurationContext = React.createContext<
  ConfigurationContextProps
>({} as ConfigurationContextProps);
