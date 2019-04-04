import { getISODay, getHours } from "date-fns";
import { Annoy } from "./types";

export const isAnnoyActive = (annoy: Annoy, time: Date): boolean => {
  const day = getISODay(time);
  const hours = getHours(time);

  const daySchedule = annoy.schedule[day];
  return daySchedule !== undefined && daySchedule[hours];
};
