import React, { Suspense } from "react";
import { useNavigation } from "react-navigation-hooks";
import { readableTasks } from "../../hooks/tasks";
import * as routes from "../../navigation/routes";
import Loading from "../Loading";
import CreateButton from "./CreateButton";
import List from "./List";
import HeaderRight from "./HeaderRight";

const ListScreen = () => {
  const { navigate } = useNavigation();
  const tasks = readableTasks();

  return (
    <Suspense fallback={<Loading />}>
      {tasks && (
        <>
          <List tasks={tasks} />
          <CreateButton onPress={() => navigate(routes.CREATE)} />
        </>
      )}
    </Suspense>
  );
};

const ConnectedHeaderRight = () => {
  const { navigate } = useNavigation();

  return <HeaderRight onPress={() => navigate(routes.SETTINGS)} />;
};

ListScreen.navigationOptions = {
  title: "AnnoyMe!",
  headerRight: <ConnectedHeaderRight />,
};

export default ListScreen;
