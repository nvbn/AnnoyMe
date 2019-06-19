import React, { useState, useCallback, useContext, useEffect } from "react";
import { useNavigation, useFocusState } from "react-navigation-hooks";
import { ServicesContext } from "../../contexts";
import { useAsyncMemo } from "../../hooks";
import * as routes from "../../navigation/routes";
import * as constants from "../../constants";
import TaskWithStatus from "../../dto/TaskWithStatus";
import { isActive } from "../../dto/Task";
import Loading from "../Loading";
import CreateButton from "./CreateButton";
import List from "./List";
import HeaderRight from "./HeaderRight";

/** The main screen with list of all tasks. */
const ListScreen = () => {
  const { navigate } = useNavigation();
  const { tasksService } = useContext(ServicesContext);
  const focusState = useFocusState();

  const openTask = useCallback(({ id }) => navigate(routes.EDIT, { id }), []);
  const toCreateScreen = useCallback(() => navigate(routes.CREATE), []);

  const tasks = useAsyncMemo(() => tasksService.getAll(), [focusState]);
  const [tasksWithStatus, setTasksWithStatus] = useState<TaskWithStatus[]>();
  useEffect(() => {
    const updateTasksStatus = () => {
      const now = new Date();

      if (tasks) {
        setTasksWithStatus(
          tasks.map(task => ({
            ...task,
            isActive: isActive(task, now),
          })),
        );
      }
    };

    updateTasksStatus();

    const refreshInterval = setInterval(
      updateTasksStatus,
      constants.REFRESH_INTERVAL,
    );

    return () => clearInterval(refreshInterval);
  }, [tasks]);

  if (!tasksWithStatus) {
    return <Loading />;
  }

  return (
    <>
      <List tasks={tasksWithStatus} onItemPress={openTask} />
      <CreateButton onPress={toCreateScreen} />
    </>
  );
};

/** Settings button for navigator panel. */
const ConnectedHeaderRight = () => {
  const { navigate } = useNavigation();
  const toSettings = useCallback(() => navigate(routes.SETTINGS), [navigate]);

  return <HeaderRight onPress={toSettings} />;
};

ListScreen.navigationOptions = {
  title: "AnnoyMe!",
  headerRight: <ConnectedHeaderRight />,
};

export default ListScreen;
