import { range, flatMap, dropWhile } from "lodash";
import {
  differenceInHours,
  addDays,
  addMinutes,
  startOfHour,
  addHours,
  isBefore,
  getHours,
} from "date-fns";

const getHourMinutesToSchedule = (frequency: number) => range(1, 60, frequency);

const getDatesForHourToSchedule = (
  hour: Date,
  hourMinutesToSchedule: Array<number>,
) => hourMinutesToSchedule.map(minutes => addMinutes(hour, minutes));

const getHourRange = (from: Date, days: number) => {
  const beginHour = startOfHour(from);
  const endHour = addDays(beginHour, days);

  return range(0, differenceInHours(endHour, beginHour)).map(toAdd =>
    addHours(beginHour, toAdd),
  );
};

const isEnabledHour = (date: Date, startHour: number, endHour: number) => {
  const hour = getHours(date);

  return startHour <= hour && hour <= endHour;
};

/**
 * Returns dates range for scheduling notifications.
 *
 * @param from - start date for notifications
 * @param days - amount of days to schedule
 * @param frequency - frequency of notifications in minutes
 */
export const getDatesToSchedule = (
  from: Date,
  days: number,
  frequency: number,
  startHour: number,
  endHour: number,
): Array<Date> => {
  const hourRange = getHourRange(from, days).filter(date =>
    isEnabledHour(date, startHour, endHour),
  );

  const hourMinutesToSchedule = getHourMinutesToSchedule(frequency);

  return flatMap(hourRange, hour =>
    getDatesForHourToSchedule(hour, hourMinutesToSchedule),
  );
};

/**
 * Remove dates in the past for scheduling notifications.
 *
 * @param now - current date
 * @param delay - minimal delay for a notification to schedule in minutes
 * @param dates - array of dates
 */
export const removePast = (now: Date, delay: number, dates: Array<Date>) => {
  const firstNotificationDate = addMinutes(now, delay);

  return dropWhile(dates, date => isBefore(date, firstNotificationDate));
};
