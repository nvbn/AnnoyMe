import { getISODay, getHours } from "date-fns";
import TaskSchedule from "./TaskSchedule";

/** Representation of a task, the app sends notifications with a task is active. */
export default interface Task {
  id: string;
  created: Date;
  title: string;
  schedule: TaskSchedule;
}

/**
 * Returns true when task is action at the time.
 *
 * @param annoy single annoy instance.
 * @param time current time
 */
export const isActive = (task: Task, time: Date): boolean => {
  const day = getISODay(time);
  const hours = getHours(time);

  const daySchedule = task.schedule[day];
  return Boolean(daySchedule !== undefined && daySchedule[hours]);
};

export const isTitleValid = (title?: string): boolean =>
  Boolean(title && title.length);

export const isValid = ({ title }: Task): boolean => isTitleValid(title);
