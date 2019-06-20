import { getISODay, getHours } from "date-fns";
import TaskSchedule from "./TaskSchedule";

/** Representation of a task, the app sends notifications with a task is active. */
export default interface Task {
  id: string;
  created: Date;
  title: string;
  schedule: TaskSchedule;
}

export const isTitleValid = (title: string) => title.length > 0;

export const isValid = ({ title }: Task) => isTitleValid(title);

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
