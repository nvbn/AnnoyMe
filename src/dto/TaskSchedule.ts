/** Has `true` as a value if a task is enabled on a specified hour. */
interface TaskHours {
  readonly [key: number]: boolean;
}

/** Task schedule in format `weekday: TaskHours` */
export default interface TaskSchedule {
  readonly [key: number]: TaskHours;
}
