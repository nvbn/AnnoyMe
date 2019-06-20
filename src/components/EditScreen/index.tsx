import React, { useCallback, useContext, useEffect } from "react";
import { useNavigationParam } from "react-navigation-hooks";
import { useNavigation } from "react-navigation-hooks";
import { ServicesContext } from "../../contexts";
import * as routes from "../../navigation/routes";
import { useAsyncState, useAsyncMemo } from "../../hooks";
import { isValid } from "../../dto/Task";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import DeleteButton from "./DeleteButton";

/** A screen for modifying existing tasks. */
const EditScreen = () => {
  const { navigate } = useNavigation();
  const { tasksService, settingsService } = useContext(ServicesContext);

  const settings = useAsyncMemo(() => settingsService.read(), []);

  const taskID = useNavigationParam<string, string>("id");
  const [task, setTask] = useAsyncState(tasksService.getOne(taskID), [taskID]);

  useEffect(() => {
    if (task && isValid(task)) {
      tasksService.save(task);
    }
  }, [task]);

  const deleteTask = useCallback(
    () => tasksService.delete(taskID).then(() => navigate(routes.LIST)),
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
