import { parse } from "date-fns";
import React from "react";
import renderer, { act } from "react-test-renderer";
import Task from "../../../dto/Task";
import TaskForm from "../TaskForm";

const scheduleStartHour = 9;
const scheduleEndHour = 21;
const onChangeIgnore = (_: Task) => undefined;

it("TaskForm renders valid task", () => {
  const task = {
    id: "task-id",
    title: "Cook the dinner",
    created: parse("2019-01-01"),
    schedule: {
      1: { 10: true, 11: true },
    },
  };

  const tree = renderer
    .create(
      <TaskForm
        task={task}
        scheduleStartHour={scheduleStartHour}
        scheduleEndHour={scheduleEndHour}
        onChange={onChangeIgnore}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("TaskForm-valid-task");
});

it("TaskForm renders invalid task", () => {
  const task = {
    id: "task-id",
    title: "",
    created: parse("2019-01-01"),
    schedule: {
      1: { 10: true, 11: true },
    },
  };

  const tree = renderer
    .create(
      <TaskForm
        task={task}
        scheduleStartHour={scheduleStartHour}
        scheduleEndHour={scheduleEndHour}
        onChange={onChangeIgnore}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("TaskForm-invalid-task");
});

it("TaskForm changes task title", () => {
  const task = {
    id: "task-id",
    title: "",
    created: parse("2019-01-01"),
    schedule: {
      1: { 10: true, 11: true },
    },
  };

  const onChange = jest.fn((_: Task) => undefined);

  const component = renderer.create(
    <TaskForm
      task={task}
      scheduleStartHour={scheduleStartHour}
      scheduleEndHour={scheduleEndHour}
      onChange={onChange}
    />,
  ).root;

  const titleInput = component.findByProps({ testID: "title-input" });
  expect(titleInput).toBeTruthy();

  const newTitle = "New title!";
  act(() => {
    titleInput.props.onChangeText(newTitle);
  });
  expect(onChange.mock.calls).toEqual([
    [
      {
        ...task,
        title: newTitle,
      },
    ],
  ]);
});

it("TaskForm changes task schedule", () => {
  const task = {
    id: "task-id",
    title: "",
    created: parse("2019-01-01"),
    schedule: {
      1: { 10: true, 11: true },
    },
  };

  const onChange = jest.fn((_: Task) => undefined);

  const component = renderer.create(
    <TaskForm
      task={task}
      scheduleStartHour={scheduleStartHour}
      scheduleEndHour={scheduleEndHour}
      onChange={onChange}
    />,
  ).root;

  const scheduleInput = component.findByProps({ testID: "schedule-input" });
  expect(scheduleInput).toBeTruthy();

  const newSchedule = { 1: { 10: true, 11: true, 12: true } };
  scheduleInput.props.onChange(newSchedule);
  expect(onChange.mock.calls).toEqual([
    [
      {
        ...task,
        schedule: newSchedule,
      },
    ],
  ]);
});
