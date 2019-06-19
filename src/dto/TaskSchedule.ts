interface TaskHours {
  [key: number]: boolean;
}

export default interface TaskSchedule {
  [key: number]: TaskHours;
}
