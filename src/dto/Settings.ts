import * as constants from "../constants";

/** Application global settings. */
export default interface Settings {
  startHour: number;
  endHour: number;
  frequency: number;
}

export const isValidHour = (hour: number) => hour >= 0 && hour <= 24;

export const isValidFrequency = (minutes: number) =>
  minutes >= constants.MIN_FREQUENCY && minutes <= 120;

export const isValid = ({ startHour, endHour, frequency }: Settings) =>
  isValidHour(startHour) && isValidHour(endHour) && isValidFrequency(frequency);
