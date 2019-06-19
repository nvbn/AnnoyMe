import React, { useCallback, useContext, useEffect } from "react";
import { useNavigationParam } from "react-navigation-hooks";
import { useNavigation } from "react-navigation-hooks";
import { ServicesContext } from "../../contexts";
import * as routes from "../../navigation/routes";
import { useAsyncState, useAsyncMemo } from "../../hooks";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import DeleteButton from "./DeleteButton";

/** A screen for modifying existing tasks. */
const EditScreen = () => {
  const { navigate } = useNavigation();
  const { tasksService, settingsService } = useContext(ServicesContext);

  const settings = useAsyncMemo(() => settingsService.read(), []);

  const taskID = useNavigationParam<string, string>("id");
  const [task, setTask] = useAsyncState(
    tasksService.getOne(taskID).then(task => ({ ...task, isValid: true })),
    [taskID],
  );

  useEffect(() => {
    if (task && task.isValid) {
      tasksService.save(task);
    }
  }, [task]);

  const deleteTask = useCallback(() => {
    if (task) {
      tasksService.delete(task.id).then(() => navigate(routes.LIST));
    }
  }, [task]);

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
