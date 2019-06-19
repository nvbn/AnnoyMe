import { getISODay, getHours } from "date-fns";
import TaskSchedule from "./TaskSchedule";

interface Task {
  id: string;
  created: Date;
  title: string;
  schedule: TaskSchedule;
}

/**
 * Returns true when annoy is action at the time.
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

export default Task;
