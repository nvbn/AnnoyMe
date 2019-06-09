export interface TaskHours {
  [key: number]: boolean;
}

export interface TaskSchedule {
  [key: number]: TaskHours;
}

export interface Task {
  id: string;
  created: Date;
  title: string;
  schedule: TaskSchedule;
}
