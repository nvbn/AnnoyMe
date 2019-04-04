import { omit, fromPairs } from "lodash";
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

export default (state = initialState, action: AnnoysActionTypes): Annoys => {
  switch (action.type) {
    case CREATE_ANNOY:
      return {
        ...state,
        items: {
          ...state.items,
          [action.annoy.id]: action.annoy,
        },
      };
    case UPDATE_ANNOY:
      return {
        ...state,
        items: {
          ...state.items,
          [action.annoy.id]: action.annoy,
        },
      };
    case DELETE_ANNOY:
      return {
        ...state,
        items: omit(state.items, action.id),
      };
    case REFRESH_IS_ACTIVE:
      return {
        ...state,
        active: fromPairs(
          Object.values(state.items).map(annoy => [
            annoy.id,
            isAnnoyActive(annoy, action.time),
          ]),
        ),
      };
    default:
      return state;
  }
};
