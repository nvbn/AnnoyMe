import { getISODay, getHours } from "date-fns";
import ITaskValidator from "./ITaskValidator";
import Task from "../../dto/Task";

export default class TaskValidator implements ITaskValidator {
  /**
   * Returns true when task is action at the time.
   *
   * @param task single task instance.
   * @param time current time
   */
  public isActive(task: Task, time: Date): boolean {
    const day = getISODay(time);
    const hours = getHours(time);

    const daySchedule = task.schedule[day];
    return Boolean(daySchedule !== undefined && daySchedule[hours]);
  }

  public isTitleValid(title?: string): boolean {
    return Boolean(title && title.length);
  }

  public isValid({ title }: Task): boolean {
    return this.isTitleValid(title);
  }
}
