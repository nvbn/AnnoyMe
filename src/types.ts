export interface AnnoyHours {
  [key: number]: boolean;
}

export interface AnnoySchedule {
  [key: number]: AnnoyHours;
}

export interface Annoy {
  id: string;
  created: Date;
  title: string;
  schedule: AnnoySchedule;
}

export interface ActiveAnnoys {
  [id: string]: boolean;
}

export interface AnnoyItems {
  [id: string]: Annoy;
}

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

export interface Settings {
  startHour: number;
  endHour: number;
  frequency: number;
}
