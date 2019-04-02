export const DEFAULT_START_HOUR = 8;

export const DEFAULT_END_HOUR = 24;

export const DEFAULT_FREQUENCY = 10;

export const DEFAULT_ANNOYS = [
  {
    id: "default-0",
    title: "Grab a fruit after lunch",
    schedule: {
      1: { 12: true, 13: true },
      2: { 12: true, 13: true },
      3: { 12: true, 13: true },
      4: { 12: true, 13: true },
      5: { 12: true, 13: true },
    },
    isActiveNow: false,
  },
  {
    id: "default-1",
    title: "Go run in the park",
    schedule: {
      6: { 10: true, 11: true },
      7: { 10: true, 11: true },
    },
    isActiveNow: false,
  },
  {
    id: "default-2",
    title: "Read a book",
    schedule: {
      1: { 21: true, 22: true, 23: true },
      2: { 21: true, 22: true, 23: true },
      3: { 21: true, 22: true, 23: true },
      4: { 21: true, 22: true, 23: true },
      5: { 21: true, 22: true, 23: true },
    },
    isActiveNow: false,
  },
];
