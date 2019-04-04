import { Annoy } from "../../types";

export interface ActiveAnnoys {
  [id: string]: boolean;
}

export interface Annoys {
  items: Array<Annoy>;
  active: ActiveAnnoys;
}

export const CREATE_ANNOY = "CREATE_ANNOY";

interface CreateAnnoyAction {
  type: typeof CREATE_ANNOY;
  annoy: Annoy;
}

export const UPDATE_ANNOY = "UPDATE_ANNOY";

interface UpdateAnnoyAction {
  type: typeof UPDATE_ANNOY;
  annoy: Annoy;
}

export const DELETE_ANNOY = "DELETE_ANNOY";

interface DeleteAnnoyAction {
  type: typeof DELETE_ANNOY;
  id: string;
}

export const REFRESH_IS_ACTIVE = "REFRESH_IS_ACTIVE";

interface RefreshIsActiveAction {
  type: typeof REFRESH_IS_ACTIVE;
  time: Date;
}

export type AnnoysActionTypes =
  | CreateAnnoyAction
  | UpdateAnnoyAction
  | DeleteAnnoyAction
  | RefreshIsActiveAction;
