import React, { useContext, useEffect, useState, Suspense } from "react";
import ServicesContext from "../../services/context";
import { Settings } from "../../services/settings/types";
import Loading from "../Loading";
import Form from "./Form";

const SettingsScreen = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    settingsService.read().then(setSettings);

    return () => {
      if (settings) settingsService.save(settings);
    };
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {settings && (
        <Form
          onSettingChange={(key, val) => {
            setSettings({
              ...settings,
              [key]: val,
            });
          }}
          {...settings}
        />
      )}
    </Suspense>
  );
};

SettingsScreen.navigationOptions = {
  title: "Settings",
};

export default SettingsScreen;
