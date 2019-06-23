import React, { useCallback, useContext, useEffect, useState } from "react";
import { useFocusState, useNavigation } from "react-navigation-hooks";
import * as routes from "../../constants/routes";
import { ConfigurationContext, ServicesContext } from "../../contexts";
import { isActive } from "../../dto/Task";
import TaskWithStatus from "../../dto/TaskWithStatus";
import { useAsyncMemo } from "../../hooks";
import Loading from "../Loading";
import CreateButton from "./CreateButton";
import HeaderRight from "./HeaderRight";
import List from "./List";

/** The main screen with list of all tasks. */
const ListScreen = () => {
  const { navigate } = useNavigation();
  const { refreshInterval } = useContext(ConfigurationContext);
  const { tasksRepository } = useContext(ServicesContext);
  const focusState = useFocusState();

  const openTask = useCallback(({ id }) => navigate(routes.EDIT, { id }), []);
  const toCreateScreen = useCallback(() => navigate(routes.CREATE), []);

  const tasks = useAsyncMemo(() => tasksRepository.getAll(), [focusState]);
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

    const intervalId = setInterval(updateTasksStatus, refreshInterval);

    return () => clearInterval(intervalId);
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
