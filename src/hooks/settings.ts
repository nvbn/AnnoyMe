import { useContext, useCallback } from "react";
import ServicesContext from "../services/context";
import { Settings } from "../types";
import { useAsyncState, useFinalEffect } from "./utils";

export const useReadableSettings = () => {
  const { settingsService } = useContext(ServicesContext);
  const [settings] = useAsyncState(settingsService.read(), []);
  return settings;
};

export const useEditableSettings = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useAsyncState(settingsService.read(), []);
  useFinalEffect(() => settingsService.save(settings!), [settings]);

  const changeSetting = useCallback(
    <T>(key: string, val: T) => {
      setSettings({
        ...settings,
        [key]: val,
      } as Settings);
    },
    [settings, setSettings],
  );

  return { settings, changeSetting };
};
