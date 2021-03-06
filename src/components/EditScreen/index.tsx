import React, { useCallback, useContext, useEffect } from "react";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import * as routes from "../../constants/routes";
import { ServicesContext } from "../../contexts";
import { isValid } from "../../dto/Task";
import { useAsyncMemo, useAsyncState } from "../../hooks";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import DeleteButton from "./DeleteButton";

/** A screen for modifying existing tasks. */
const EditScreen = () => {
  const { navigate } = useNavigation();
  const { tasksRepository, settingsRepository } = useContext(ServicesContext);

  const settings = useAsyncMemo(() => settingsRepository.read(), []);

  const taskID = useNavigationParam<string, string>("id");
  const [task, setTask] = useAsyncState(tasksRepository.getOne(taskID), [
    taskID,
  ]);

  useEffect(() => {
    if (task && isValid(task)) {
      tasksRepository.save(task);
    }
  }, [task]);

  const deleteTask = useCallback(
    () => tasksRepository.delete(taskID).then(() => navigate(routes.LIST)),
    [taskID],
  );

  if (!settings || !task) {
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
      <DeleteButton title={task.title} onYes={deleteTask} />
    </>
  );
};

EditScreen.navigationOptions = {
  title: "Change the annoyance",
};

export default EditScreen;
