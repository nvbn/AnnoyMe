/** Application global settings. */
export default interface Settings {
  startHour: number;
  endHour: number;
  frequency: number;
}

const isHourValid = (hour: number) => hour >= 0 && hour <= 24;

export const isStartHourValid = isHourValid;

export const isEndHourValid = isHourValid;

/** Validates frequency in minutes. */
export const isFrequencyValid = (frequency: number) =>
  frequency >= 5 && frequency <= 120;

export const isValid = ({ startHour, endHour, frequency }: Settings) =>
  isStartHourValid(startHour) &&
  isEndHourValid(endHour) &&
  isFrequencyValid(frequency);
