import TaskSchedule from "./TaskSchedule";

/** Representation of a task, the app sends notifications with a task is active. */
export default interface Task {
  id: string;
  created: Date;
  title: string;
  schedule: TaskSchedule;
}
