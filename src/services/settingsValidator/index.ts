import Settings from "../../dto/Settings";
import ISettingsValidator from "./ISettingsValidator";

export default class SettingsValidator implements ISettingsValidator {
  minInterval: number;
  maxInterval: number;

  constructor(minInterval: number, maxInterval: number) {
    this.minInterval = minInterval;
    this.maxInterval = maxInterval;
  }

  public isValidHour(hour: number): boolean {
    return hour >= 0 && hour <= 24;
  }

  public isValidFrequency(minutes: number): boolean {
    return minutes >= 5 && minutes <= 120;
  }

  public isValid({ startHour, endHour, frequency }: Settings) {
    return (
      this.isValidHour(startHour) &&
      this.isValidHour(endHour) &&
      this.isValidFrequency(frequency)
    );
  }
}
