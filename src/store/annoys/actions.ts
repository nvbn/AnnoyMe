import { Annoy } from "../../types";
import {
  CREATE_ANNOY,
  UPDATE_ANNOY,
  DELETE_ANNOY,
  REFRESH_IS_ACTIVE,
} from "./types";

export const createAnnoy = (annoy: Annoy) => ({
  type: CREATE_ANNOY,
  annoy,
});

export const updateAnnoy = (annoy: Annoy) => ({
  type: UPDATE_ANNOY,
  annoy,
});

export const deleteAnnoy = (id: string) => ({
  type: DELETE_ANNOY,
  id,
});

export const refreshIsActive = (active: Array<string>) => ({
  type: REFRESH_IS_ACTIVE,
  active,
});
