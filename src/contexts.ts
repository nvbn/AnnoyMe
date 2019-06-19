import React from "react";
import ITasksService from "./services/tasks/ITasksService";
import ISettingsService from "./services/settings/ISettingsService";

interface ServicesContextProps {
  tasksService: ITasksService;
  settingsService: ISettingsService;
}

export const ServicesContext = React.createContext<ServicesContextProps>(
  {} as ServicesContextProps,
);
