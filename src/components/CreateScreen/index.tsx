import React, { Suspense } from "react";
import { useNavigation } from "react-navigation-hooks";
import * as routes from "../../navigation/routes";
import { readableSettings } from "../../hooks/settings";
import { createableTask } from "../../hooks/tasks";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import SaveButton from "./SaveButton";

const CreateScreen = () => {
  const { navigate } = useNavigation();
  const settings = readableSettings();
  const {
    task,
    isValid,
    setIsValid,
    isSaving,
    updateTaskData,
    save,
  } = createableTask();

  const createTask = () => {
    save().then(() => navigate(routes.LIST));
  };

  return (
    <Suspense fallback={<Loading />}>
      {settings && !isSaving && (
        <>
          <TaskForm
            title={task.title}
            schedule={task.schedule}
            startHour={settings.startHour}
            endHour={settings.endHour}
            onChange={updateTaskData}
            onValidationChange={setIsValid}
          />
          {isValid && <SaveButton onPress={createTask} />}
        </>
      )}
    </Suspense>
  );
};

CreateScreen.navigationOptions = {
  title: "Create a new annoyance",
};

export default CreateScreen;
