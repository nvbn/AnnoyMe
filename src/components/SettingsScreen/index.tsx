import React, { useContext, useEffect, useState, Suspense } from "react";
import ServicesContext from "../../services/context";
import Loading from "../Loading";
import Form from "./Form";

const SettingsScreen = () => {
  const { settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useState();
  useEffect(() => {
    settingsService.read().then(setSettings);

    return () => {
      settingsService.save(settings);
    };
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {settings && (
        <Form
          onNumberSettingsChange={(key, val) => {
            setSettings({
              ...setImmediate,
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
