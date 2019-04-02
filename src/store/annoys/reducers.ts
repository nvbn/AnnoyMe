import { findIndex } from "lodash";
import { getISODay, getHours } from "date-fns";
import { Annoy } from "../../types";
import * as constants from "../../constants";
import {
  Annoys,
  AnnoysActionTypes,
  CREATE_ANNOY,
  UPDATE_ANNOY,
  DELETE_ANNOY,
  REFRESH_IS_ACTIVE,
} from "./types";

const initialState: Annoys = {
  items: constants.DEFAULT_ANNOYS,
};

const filterOutId = (items: Array<Annoy>, idToRemove: string): Array<Annoy> =>
  items.filter(({ id }) => id !== idToRemove);

const setIsActive = (annoy: Annoy, time: Date): Annoy => {
  const day = getISODay(time);
  const hours = getHours(time);

  const daySchedule = annoy.schedule[day];
  if (daySchedule === undefined || !daySchedule[hours]) {
    return {
      ...annoy,
      isActiveNow: false,
    };
  }

  return {
    ...annoy,
    isActiveNow: true,
  };
};

export default (state = initialState, action: AnnoysActionTypes): Annoys => {
  switch (action.type) {
    case CREATE_ANNOY:
      return {
        ...state,
        items: [action.annoy, ...filterOutId(state.items, action.annoy.id)],
      };
    case UPDATE_ANNOY:
      const items = [...state.items];
      const index = findIndex(items, ({ id }) => id === action.annoy.id);
      items[index] = action.annoy;
      return {
        ...state,
        items,
      };
    case DELETE_ANNOY:
      return {
        ...state,
        items: [...filterOutId(state.items, action.id)],
      };
    case REFRESH_IS_ACTIVE:
      return {
        ...state,
        items: state.items.map(annoy => setIsActive(annoy, action.time)),
      };
    default:
      return state;
  }
};
