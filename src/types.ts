export interface AnnoyHours {
  [key: number]: boolean;
}

export interface AnnoySchedule {
  [key: number]: AnnoyHours;
}

export interface Annoy {
  id: string;
  title: string;
  schedule: AnnoySchedule;
  isActiveNow: boolean;
}
