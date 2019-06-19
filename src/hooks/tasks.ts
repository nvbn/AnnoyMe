import { useContext, useState } from "react";
import ServicesContext from "../services/context";
import { TaskChanges } from "../types";
import { useAsyncState, useFinalEffect } from "./utils";

export const useCreateableTask = () => {
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

export const useEditableTask = (id: string) => {
  const { tasksService } = useContext(ServicesContext);

  const [task, setTask] = useAsyncState(tasksService.getOne(id), [id]);

  const [isDeleted, setIsDeleted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  useFinalEffect(() => {
    if (!isDeleted && isValid) {
      tasksService
        .save(task!)
        .then(() => {}, err => console.error("Unable to save task", err));
    }
  }, [task, isDeleted]);

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
