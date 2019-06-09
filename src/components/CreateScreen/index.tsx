import React, { useCallback, Suspense } from "react";
import { useNavigation } from "react-navigation-hooks";
import * as routes from "../../navigation/routes";
import { useReadableSettings } from "../../hooks/settings";
import { useCreateableTask } from "../../hooks/tasks";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import SaveButton from "./SaveButton";

const CreateScreen = () => {
  const { navigate } = useNavigation();
  const settings = useReadableSettings();
  const {
    task,
    isValid,
    setIsValid,
    isSaving,
    updateTaskData,
    save,
  } = useCreateableTask();

  const createTask = useCallback(() => {
    save().then(() => navigate(routes.LIST));
  }, [navigate]);

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
