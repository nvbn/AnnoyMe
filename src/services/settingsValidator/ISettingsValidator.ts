import Settings from "../../dto/Settings";

export default interface ISettingsValidator {
  isValidHour(hour: number): boolean;
  isValidFrequency(minutes: number): boolean;
  isValid(settings: Settings): boolean;
}
