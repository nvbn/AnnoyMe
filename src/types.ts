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

export interface TaskChanges {
  title?: string;
  schedule?: TaskSchedule;
}

export interface EditableTask extends Task {
  isValid: boolean;
}

export interface Settings {
  startHour: number;
  endHour: number;
  frequency: number;
}
