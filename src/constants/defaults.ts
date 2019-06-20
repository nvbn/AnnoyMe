import Task from "../dto/Task";
import Settings from "../dto/Settings";

export const DEFAULT_START_HOUR = 8;

export const DEFAULT_END_HOUR = 24;

export const DEFAULT_FREQUENCY = 10; // minutes

export const DEFAULT_SETTINGS: Settings = {
  startHour: DEFAULT_START_HOUR,
  endHour: DEFAULT_END_HOUR,
  frequency: DEFAULT_FREQUENCY,
};

export const DEFAULT_TASKS: Task[] = [
  {
    id: "default-0",
    created: new Date(),
    schedule: {
      1: { 12: true, 13: true },
      2: { 12: true, 13: true },
      3: { 12: true, 13: true },
      4: { 12: true, 13: true },
      5: { 12: true, 13: true },
    },
    title: "Grab a fruit after lunch",
  },
  {
    id: "default-1",
    created: new Date(),
    schedule: {
      6: { 10: true, 11: true },
      7: { 10: true, 11: true },
    },
    title: "Go run in the park",
  },
  {
    id: "default-2",
    created: new Date(),
    schedule: {
      1: { 21: true, 22: true, 23: true },
      2: { 21: true, 22: true, 23: true },
      3: { 21: true, 22: true, 23: true },
      4: { 21: true, 22: true, 23: true },
      5: { 21: true, 22: true, 23: true },
    },
    title: "Read a book",
  },
];
