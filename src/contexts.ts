import React from "react";
import ITasksRepository from "./services/tasksRepository/ITasksReposiotry";
import ISettingsRepository from "./services/settingsRepository/ISettingsRepository";

interface ServicesContextProps {
  tasksRepository: ITasksRepository;
  settingsRepository: ISettingsRepository;
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
