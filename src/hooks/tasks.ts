import { useContext, useState, useEffect } from "react";
import ServicesContext from "../services/context";
import { TaskChanges, Task } from "../types";

export const readableTasks = () => {
  const { tasksService } = useContext(ServicesContext);

  const [tasks, setTasks] = useState<Task[]>();
  useEffect(() => {
    tasksService.getAll().then(setTasks);
  }, []);

  return tasks;
};

export const createableTask = () => {
  const { tasksService } = useContext(ServicesContext);

  const [task, setTask] = useState(tasksService.emptyTask());
  const [isValid, setIsValid] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const updateTaskData = (changes: TaskChanges) => {
    setTask({
      ...task,
      ...changes,
    });
  };

  const save = () => {
    setIsSaving(true);
    return tasksService.save(task);
  };

  return {
    task,
    isValid,
    setIsValid,
    isSaving,
    updateTaskData,
    save,
  };
};
