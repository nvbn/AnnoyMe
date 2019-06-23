import {
  isStartHourValid,
  isEndHourValid,
  isFrequencyValid,
  isValid,
} from "../Settings";

it("isStartHourValid ensures that start hour is valid", () => {
  expect(isStartHourValid(8)).toBe(true);
  expect(isStartHourValid(23)).toBe(true);

  expect(isStartHourValid(-1)).toBe(false);
  expect(isStartHourValid(24)).toBe(false);
});

it("isEndHourValid ensures that end hour is valid", () => {
  expect(isEndHourValid(0)).toBe(true);
  expect(isEndHourValid(20)).toBe(true);

  expect(isEndHourValid(-18)).toBe(false);
  expect(isEndHourValid(25)).toBe(false);
});

it("isFrequencyValid ensures that frequency is valid", () => {
  expect(isFrequencyValid(5)).toBe(true);
  expect(isFrequencyValid(60)).toBe(true);
  expect(isFrequencyValid(120)).toBe(true);

  expect(isFrequencyValid(4)).toBe(false);
  expect(isFrequencyValid(150)).toBe(false);
});

it("isValid ensures that ta whole settings object is valid", () => {
  expect(
    isValid({
      startHour: 8,
      endHour: 12,
      frequency: 15,
    }),
  ).toBe(true);
  expect(
    isValid({
      startHour: 0,
      endHour: 23,
      frequency: 5,
    }),
  ).toBe(true);

  expect(
    isValid({
      startHour: 24,
      endHour: 23,
      frequency: 15,
    }),
  ).toBe(false);
  expect(
    isValid({
      startHour: 10,
      endHour: 24,
      frequency: 15,
    }),
  ).toBe(false);
  expect(
    isValid({
      startHour: 10,
      endHour: 23,
      frequency: 1,
    }),
  ).toBe(false);
});
