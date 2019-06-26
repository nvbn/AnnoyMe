import React from "react";
import renderer, { act } from "react-test-renderer";
import TaskSchedule from "../../../dto/TaskSchedule";
import ScheduleInput from "../ScheduleInput";

const startHour = 9;
const endHour = 21;

const onChangeIgnore = (_: TaskSchedule) => undefined;

it("ScheduleInput renders schedule", () => {
  const schedule = {
    1: { 10: true, 11: true },
    2: { 10: true, 11: true },
    5: { 19: true, 20: true },
  };

  const tree = renderer
    .create(
      <ScheduleInput
        startHour={startHour}
        endHour={endHour}
        schedule={schedule}
        onChange={onChangeIgnore}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("ScheduleInput-renders");
});

const assertCellPress = (
  testID: string,
  scheduleBefore: TaskSchedule,
  scheduleAfter: TaskSchedule,
) => {
  const onChange = jest.fn((_: TaskSchedule) => undefined);

  const component = renderer.create(
    <ScheduleInput
      startHour={startHour}
      endHour={endHour}
      schedule={scheduleBefore}
      onChange={onChange}
    />,
  ).root;

  const cell = component.findByProps({ testID });
  expect(cell).toBeTruthy();

  act(() => cell.props.onPress());
  expect(onChange.mock.calls).toEqual([[scheduleAfter]]);
};

it("ScheduleInput activates single hour weekday", () =>
  assertCellPress("hour-weekday-5-14", {}, { 6: { 14: true } }));

it("ScheduleInput deactivates single hour weekday", () =>
  assertCellPress(
    "hour-weekday-5-14",
    { 6: { 14: true } },
    { 6: { 14: false } },
  ));

it("ScheduleInput activates hour for every weekday", () =>
  assertCellPress(
    "hour-12",
    {},
    {
      1: { 12: true },
      2: { 12: true },
      3: { 12: true },
      4: { 12: true },
      5: { 12: true },
      6: { 12: true },
      7: { 12: true },
    },
  ));

it("ScheduleInput activates hour for every weekday even if some already activated", () =>
  assertCellPress(
    "hour-12",
    { 2: { 12: true }, 3: { 12: true }, 4: { 12: true } },
    {
      1: { 12: true },
      2: { 12: true },
      3: { 12: true },
      4: { 12: true },
      5: { 12: true },
      6: { 12: true },
      7: { 12: true },
    },
  ));

it("ScheduleInput deactivates hour for every weekday", () =>
  assertCellPress(
    "hour-12",
    {
      1: { 12: true, 13: true },
      2: { 12: true },
      3: { 12: true },
      4: { 12: true },
      5: { 12: true },
      6: { 12: true },
      7: { 12: true },
    },
    {
      1: { 12: false, 13: true },
      2: { 12: false },
      3: { 12: false },
      4: { 12: false },
      5: { 12: false },
      6: { 12: false },
      7: { 12: false },
    },
  ));

it("ScheduleInput activates all enabled in settings hours in a weekday", () =>
  assertCellPress(
    "weekday-3",
    {},
    {
      4: {
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
        19: true,
        20: true,
        21: true,
      },
    },
  ));

it("ScheduleInput activates all enabled in settings hours in a weekday even if some already activated", () =>
  assertCellPress(
    "weekday-3",
    { 4: { 17: true } },
    {
      4: {
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
        19: true,
        20: true,
        21: true,
      },
    },
  ));

it("ScheduleInput deactivates all enabled in settings hours in a weekday", () =>
  assertCellPress(
    "weekday-3",
    {
      4: {
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
        19: true,
        20: true,
        21: true,
      },
    },
    {
      4: {
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
      },
    },
  ));
