import { findIndex, fromPairs } from "lodash";
import { Annoy } from "../../types";
import { isAnnoyActive } from "../../utils";
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
  active: {},
};

const filterOutId = (items: Array<Annoy>, idToRemove: string): Array<Annoy> =>
  items.filter(({ id }) => id !== idToRemove);

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
        active: fromPairs(
          state.items.map(annoy => [
            annoy.id,
            isAnnoyActive(annoy, action.time),
          ]),
        ),
      };
    default:
      return state;
  }
};
