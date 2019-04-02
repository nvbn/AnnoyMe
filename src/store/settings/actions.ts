import { SET_START_HOUR, SET_END_HOUR, SET_FREQUENCY } from "./types";

export const setStartHour = (value: number) => ({
  type: SET_START_HOUR,
  value,
});

export const setEndHour = (value: number) => ({
  type: SET_END_HOUR,
  value,
});

export const setFrequency = (value: number) => ({
  type: SET_FREQUENCY,
  value,
});
