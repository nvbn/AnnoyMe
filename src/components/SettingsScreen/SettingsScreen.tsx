import React, { useContext, useEffect } from "react";
import { ServicesContext } from "../../contexts";
import { isValid } from "../../dto/Settings";
import { useAsyncState } from "../../hooks";
import Loading from "../Loading";
import Form from "./Form";

/** A screen for modifying global application settings. */
const SettingsScreen = () => {
  const { settingsRepository } = useContext(ServicesContext);

  const [settings, setSettings] = useAsyncState(settingsRepository.read(), []);
  useEffect(() => {
    if (settings && isValid(settings)) {
      settingsRepository.save(settings);
    }
  }, [settings]);

  if (!settings) {
    return <Loading />;
  }

  return (
    <Form onChange={setSettings} settings={settings} testID="settings-form" />
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings",
};

export default SettingsScreen;
