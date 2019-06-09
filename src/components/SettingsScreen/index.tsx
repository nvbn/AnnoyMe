import React, { Suspense } from "react";
import { editableSettings } from "../../hooks/settings";
import Loading from "../Loading";
import Form from "./Form";

const SettingsScreen = () => {
  const { settings, changeSetting } = editableSettings();

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
