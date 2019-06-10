import React, { useCallback, Suspense } from "react";
import { useNavigation } from "react-navigation-hooks";
import { useReadableTasks } from "../../hooks/tasks";
import * as routes from "../../navigation/routes";
import Loading from "../Loading";
import CreateButton from "./CreateButton";
import List from "./List";
import HeaderRight from "./HeaderRight";

const ListScreen = () => {
  const { navigate } = useNavigation();
  const tasks = useReadableTasks();
  const openTask = useCallback(({ id }) => navigate(routes.EDIT, { id }), [
    navigate,
  ]);
  const toCreateScreen = useCallback(() => navigate(routes.CREATE), [navigate]);

  return (
    <Suspense fallback={<Loading />}>
      {tasks && (
        <>
          <List tasks={tasks} openTask={openTask} />
          <CreateButton onPress={toCreateScreen} />
        </>
      )}
    </Suspense>
  );
};

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
