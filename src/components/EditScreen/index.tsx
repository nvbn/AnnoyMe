import React, { Suspense } from "react";
import { useNavigationParam } from "react-navigation-hooks";
import { useNavigation } from "react-navigation-hooks";
import * as routes from "../../navigation/routes";
import { readableSettings } from "../../hooks/settings";
import { editableTask } from "../../hooks/tasks";
import Loading from "../Loading";
import TaskForm from "../TaskForm";
import DeleteButton from "./DeleteButton";

const EditScreen = () => {
  const { navigate } = useNavigation();
  const settings = readableSettings();

  const taskID = useNavigationParam<string, string>("id");
  const { task, setIsValid, updateTaskData, deleteTask } = editableTask(taskID);

  const doDeleteTask = () => {
    deleteTask().then(() => navigate(routes.LIST));
  };

  return (
    <Suspense fallback={<Loading />}>
      {settings && task && (
        <>
          <TaskForm
            title={task.title}
            schedule={task.schedule}
            startHour={settings.startHour}
            endHour={settings.endHour}
            onChange={updateTaskData}
            onValidationChange={setIsValid}
          />
          <DeleteButton title={task.title} onYes={doDeleteTask} />
        </>
      )}
    </Suspense>
  );
};

EditScreen.navigationOptions = {
  title: "Change the annoyance",
};

export default EditScreen;
