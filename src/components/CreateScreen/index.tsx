import React, { useContext, useEffect, useState, Suspense } from "react";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "react-navigation-hooks";
import * as colors from "../../colors";
import * as routes from "../../navigation/routes";
import ServicesContext from "../../services/context";
import { Settings } from "../../services/settings/types";
import Loading from "../Loading";
import Form from "./Form";

const CreateScreen = () => {
  const { navigate } = useNavigation();

  const { tasksService, settingsService } = useContext(ServicesContext);

  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    settingsService.read().then(setSettings);
  }, []);

  const [task, setTask] = useState(tasksService.emptyTask());
  const [isValid, setIsValid] = useState(false);

  return (
    <Suspense fallback={<Loading />}>
      {settings && (
        <>
          <Form
            title={task.title}
            schedule={task.schedule}
            startHour={settings.startHour}
            endHour={settings.endHour}
            onChange={changes => {
              setTask({
                ...task,
                ...changes,
              });
            }}
            onValidationChange={setIsValid}
          />
          {isValid && (
            <FloatingAction
              position="right"
              color={colors.green400}
              showBackground={false}
              onPressMain={() => {
                tasksService.create(task);
                navigate(routes.LIST);
              }}
              floatingIcon={<Icon name="save" size={25} color="white" />}
            />
          )}
        </>
      )}
    </Suspense>
  );
};

CreateScreen.navigationOptions = {
  title: "Create a new annoyance",
};

export default CreateScreen;
