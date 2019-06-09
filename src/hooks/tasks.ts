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

export const editableTask = (id: string) => {
  const { tasksService } = useContext(ServicesContext);

  const [task, setTask] = useState<Task>();
  useEffect(() => {
    tasksService.getOne(id).then(setTask);
  }, []);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  useEffect(
    () => () => {
      if (task && !isDeleted && isValid) {
        tasksService
          .save(task)
          .then(() => {}, err => console.error("Unable to save task", err));
      }
    },
    [task, isDeleted],
  );

  const deleteTask = async (): Promise<void> => {
    if (task) {
      await tasksService.delete(task.id);
      setIsDeleted(true);
    } else {
      console.warn("Trying to delete non-ready task");
    }
  };

  const updateTaskData = (changes: TaskChanges) => {
    if (task) {
      setTask({
        ...task,
        ...changes,
      });
    } else {
      console.warn("Trying to update non-ready task");
    }
  };

  return {
    task,
    isValid,
    setIsValid,
    updateTaskData,
    deleteTask,
  };
};
