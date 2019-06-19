/** Has `true` as a value if a task is enabled on a specified hour. */
interface TaskHours {
  [key: number]: boolean;
}

/** Task schedule in format `weekday: TaskHours` */
export default interface TaskSchedule {
  [key: number]: TaskHours;
}
