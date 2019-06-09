import { useContext, useEffect, useState } from "react";
import ServicesContext from "../services/context";
import { Settings } from "../types";

export const readableSettings = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    settingsService.read().then(setSettings);
  }, []);

  return settings;
};

export const editableSettings = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    settingsService.read().then(setSettings);
  }, []);
  useEffect(
    () => () => {
      if (settings) settingsService.save(settings);
    },
    [settings],
  );

  const changeSetting = <T>(key: string, val: T) => {
    setSettings({
      ...settings,
      [key]: val,
    } as Settings);
  };

  return { settings, changeSetting };
};
