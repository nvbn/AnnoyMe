import React, { useCallback, useContext, useState } from "react";
import { useNavigation } from "react-navigation-hooks";
import * as routes from "../../constants/routes";
import { useAsyncMemo } from "../../hooks";
import { ServicesContext } from "../../contexts";
import { isValid } from "../../dto/Task";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import SaveButton from "./SaveButton";

/** A screen for creating new tasks. */
const CreateScreen = () => {
  const { navigate } = useNavigation();
  const { tasksRepository, settingsRepository } = useContext(ServicesContext);

  const settings = useAsyncMemo(() => settingsRepository.read(), []);

  const [task, setTask] = useState(tasksRepository.emptyTask());

  const createTask = useCallback(() => {
    tasksRepository.create(task).then(() => navigate(routes.LIST));
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
      {isValid(task) && <SaveButton onPress={createTask} />}
    </>
  );
};

CreateScreen.navigationOptions = {
  title: "Create a new annoyance",
};

export default CreateScreen;
