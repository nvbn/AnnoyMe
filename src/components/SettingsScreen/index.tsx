import React, { useEffect, useContext, useCallback, Suspense } from "react";
import { Settings } from "../../types";
import { useAsyncState } from "../../hooks";
import { ServicesContext } from "../../contexts";
import Loading from "../Loading";
import Form from "./Form";

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

  return (
    <Suspense fallback={<Loading />}>
      {settings && <Form onSettingChange={changeSetting} {...settings} />}
    </Suspense>
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings",
};

export default SettingsScreen;
