import { getISODay, getHours } from "date-fns";
import { Annoy } from "../types";

/**
 * Returns true when annoy is action at the time.
 *
 * @param annoy single annoy instance.
 * @param time current time
 */
export const isAnnoyActive = (annoy: Annoy, time: Date): boolean => {
  const day = getISODay(time);
  const hours = getHours(time);

  const daySchedule = annoy.schedule[day];
  return Boolean(daySchedule !== undefined && daySchedule[hours]);
};
