import React, { useCallback, useContext, Suspense } from "react";
import { useNavigation, useFocusState } from "react-navigation-hooks";
import ServicesContext from "../../services/context";
import { useAsyncState } from "../../hooks/utils";
import * as routes from "../../navigation/routes";
import Loading from "../Loading";
import CreateButton from "./CreateButton";
import List from "./List";
import HeaderRight from "./HeaderRight";

const ListScreen = () => {
  const { navigate } = useNavigation();
  const { tasksService } = useContext(ServicesContext);
  const focusState = useFocusState();

  const [tasks] = useAsyncState(tasksService.getAll(), [focusState]);
  const openTask = useCallback(({ id }) => navigate(routes.EDIT, { id }), []);
  const toCreateScreen = useCallback(() => navigate(routes.CREATE), []);

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
