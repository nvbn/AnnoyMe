import React, { useCallback, useContext, useState } from "react";
import { useNavigation } from "react-navigation-hooks";
import * as routes from "../../navigation/routes";
import { useAsyncMemo } from "../../hooks";
import { ServicesContext } from "../../contexts";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import SaveButton from "./SaveButton";

/** A screen for creating new tasks. */
const CreateScreen = () => {
  const { navigate } = useNavigation();
  const { tasksService, settingsService } = useContext(ServicesContext);

  const settings = useAsyncMemo(() => settingsService.read(), []);

  const [task, setTask] = useState({
    ...tasksService.emptyTask(),
    isValid: false,
  });

  const createTask = useCallback(() => {
    tasksService.create(task).then(() => navigate(routes.LIST));
  }, [task]);

  if (!settings) {
    return <Loading />;
  }

  return (
    <>
      <TaskForm
        task={task}
        scheduleStartHour={settings.startHour}
        scheduleEndHour={settings.endHour}
        onChange={setTask}
      />
      {task.isValid && <SaveButton onPress={createTask} />}
    </>
  );
};

CreateScreen.navigationOptions = {
  title: "Create a new annoyance",
};

export default CreateScreen;
