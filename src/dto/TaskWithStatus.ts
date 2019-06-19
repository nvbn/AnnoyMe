import Task from "./Task";

/** Task representation with current status. */
export default interface TaskWithStatus extends Task {
  isActive: boolean;
}
