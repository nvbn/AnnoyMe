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
