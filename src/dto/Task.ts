import { getHours, getISODay } from "date-fns";
import TaskSchedule from "./TaskSchedule";

/** Representation of a task, the app sends notifications with a task is active. */
export default interface Task {
  readonly id: string;
  readonly created: Date;
  readonly title: string;
  readonly schedule: TaskSchedule;
}

/** Ensures that a title is valid.
 *
 * @param title title of a task
 */
export const isTitleValid = (title: string) => title.length > 0;

/** Ensures that a task is valid.
 *
 * @param task task to validate
 */
export const isValid = ({ title }: Task) => isTitleValid(title);

/**
 * Returns true when task is active at the time.
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
