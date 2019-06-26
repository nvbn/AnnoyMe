import React from "react";
import renderer, { act } from "react-test-renderer";
import TaskWithStatus from "../../../dto/TaskWithStatus";
import List from "../List";

const tasks = [
  {
    id: "1",
    created: new Date(),
    title: "First test task",
    schedule: {},
    isActive: false,
  },
  {
    id: "2",
    created: new Date(),
    title: "Second test task",
    schedule: {},
    isActive: true,
  },
];

it("List renders all tasks", () => {
  const tree = renderer
    .create(
      <List tasks={tasks} onItemPress={(_: TaskWithStatus) => undefined} />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("List-all");
});

it("List handles item clicks", () => {
  const onItemPress = jest.fn((_: TaskWithStatus) => undefined);

  const component = renderer.create(
    <List tasks={tasks} onItemPress={onItemPress} />,
  ).root;

  const secondTask = component.findByProps({ testID: "task-item-2" });
  expect(secondTask).toBeTruthy();

  act(() => secondTask.props.onPress());

  const firstTask = component.findByProps({ testID: "task-item-1" });
  expect(firstTask).toBeTruthy();

  act(() => firstTask.props.onPress());

  expect(onItemPress.mock.calls).toEqual([[tasks[1]], [tasks[0]]]);
});
