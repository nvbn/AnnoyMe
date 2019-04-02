export interface Settings {
  startHour: number;
  endHour: number;
  frequency: number;
}

export const SET_START_HOUR = "SET_START_HOUR";

interface SetStartHourAction {
  type: typeof SET_START_HOUR;
  value: number;
}

export const SET_END_HOUR = "SET_END_HOUR";

interface SetEndHourAction {
  type: typeof SET_END_HOUR;
  value: number;
}

export const SET_FREQUENCY = "SET_FREQUENCY";

interface SetFrequencyAction {
  type: typeof SET_FREQUENCY;
  value: number;
}

export type SettingsActionTypes =
  | SetStartHourAction
  | SetEndHourAction
  | SetFrequencyAction;
