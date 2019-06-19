import React, { useEffect, useContext, useCallback } from "react";
import Settings from "../../dto/Settings";
import { useAsyncState } from "../../hooks";
import { ServicesContext } from "../../contexts";
import Loading from "../Loading";
import Form from "./Form";

/** A screen for modifying global application settings. */
const SettingsScreen = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useAsyncState(settingsService.read(), []);
  useEffect(() => {
    if (settings) {
      settingsService.save(settings);
    }
  }, [settings]);

  const changeSetting = useCallback(
    <T extends string | number>(key: string, val: T) => {
      setSettings({
        ...settings,
        [key]: val,
      } as Settings);
    },
    [settings, setSettings],
  );

  if (!settings) {
    return <Loading />;
  }

  return <Form onSettingChange={changeSetting} {...settings} />;
};

SettingsScreen.navigationOptions = {
  title: "Settings",
};

export default SettingsScreen;
