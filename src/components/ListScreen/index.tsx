import React, { useState, useEffect, useContext, Suspense } from "react";
import ServicesContext from "../../services/context";
import Loading from "../Loading";
import CreateButton from "./CreateButton";
import List from "./List";
import HeaderRight from "./HeaderRight";

const ListScreen = () => {
  const { tasksService } = useContext(ServicesContext);

  const [tasks, setTasks] = useState();
  useEffect(() => {
    tasksService.getAll().then(setTasks);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {tasks && (
        <>
          <List tasks={tasks} />
          <CreateButton />
        </>
      )}
    </Suspense>
  );
};

ListScreen.navigationOptions = {
  title: "AnnoyMe!",
  headerRight: <HeaderRight />,
};

export default ListScreen;
