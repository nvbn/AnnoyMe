/** Application global settings. */
export default interface Settings {
  readonly startHour: number;
  readonly endHour: number;
  readonly frequency: number;
}

/** isHourValid ensures that passed number is a valid hour for scheduling a task.
 *
 * @param hour a number to check
 */
const isHourValid = (hour: number) => hour >= 0 && hour <= 23;

export const isStartHourValid = isHourValid;

export const isEndHourValid = isHourValid;

/** Validates notification frequency in minutes.
 *
 * @param frequency a number to validate
 */
export const isFrequencyValid = (frequency: number) =>
  frequency >= 5 && frequency <= 120;

/** Validates settings object.
 *
 * @param settings an object ot validate
 */
export const isValid = ({ startHour, endHour, frequency }: Settings) =>
  isStartHourValid(startHour) &&
  isEndHourValid(endHour) &&
  isFrequencyValid(frequency);
