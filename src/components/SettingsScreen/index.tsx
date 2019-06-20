import React, { useEffect, useContext, useCallback } from "react";
import { useAsyncState } from "../../hooks";
import { ServicesContext } from "../../contexts";
import Loading from "../Loading";
import Form from "./Form";

/** A screen for modifying global application settings. */
const SettingsScreen = () => {
  const { settingsRepository, settingsValidator } = useContext(ServicesContext);

  const [settings, setSettings] = useAsyncState(settingsRepository.read(), []);
  useEffect(() => {
    if (settings && settingsValidator.isValid(settings)) {
      settingsRepository.save(settings);
    }
  }, [settings]);

  if (!settings) {
    return <Loading />;
  }

  return (
    <Form
      onChange={setSettings}
      settings={settings}
      isValidHour={settingsValidator.isValidHour}
      isValidFrequency={settingsValidator.isValidFrequency}
    />
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings",
};

export default SettingsScreen;
