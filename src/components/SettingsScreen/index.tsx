import React, { useEffect, useContext, useCallback } from "react";
import { isValid } from "../../dto/Settings";
import { useAsyncState } from "../../hooks";
import { ServicesContext } from "../../contexts";
import Loading from "../Loading";
import Form from "./Form";

/** A screen for modifying global application settings. */
const SettingsScreen = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useAsyncState(settingsService.read(), []);
  useEffect(() => {
    if (settings && isValid(settings)) {
      settingsService.save(settings);
    }
  }, [settings]);

  if (!settings) {
    return <Loading />;
  }

  return <Form onChange={setSettings} settings={settings} />;
};

SettingsScreen.navigationOptions = {
  title: "Settings",
};

export default SettingsScreen;
