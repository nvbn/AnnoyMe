import React, { useCallback, useContext, useEffect, Suspense } from "react";
import { useNavigationParam } from "react-navigation-hooks";
import { useNavigation } from "react-navigation-hooks";
import ServicesContext from "../../services/context";
import * as routes from "../../navigation/routes";
import { useReadableSettings } from "../../hooks/settings";
import { useAsyncState } from "../../hooks/utils";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import DeleteButton from "./DeleteButton";

const EditScreen = () => {
  const { navigate } = useNavigation();
  const settings = useReadableSettings();
  const { tasksService } = useContext(ServicesContext);

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

  return (
    <Suspense fallback={<Loading />}>
      {settings && task && (
        <>
          <TaskForm
            task={task}
            scheduleStartHour={settings.startHour}
            scheduleEndHour={settings.endHour}
            onChange={setTask}
          />
          <DeleteButton title={task.title} onYes={deleteTask} />
        </>
      )}
    </Suspense>
  );
};

EditScreen.navigationOptions = {
  title: "Change the annoyance",
};

export default EditScreen;
