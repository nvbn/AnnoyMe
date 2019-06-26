import React from "react";
import renderer, { act } from "react-test-renderer";
import Item from "../Item";

it("Item renders active task", () => {
  const task = {
    id: "test",
    created: new Date(),
    title: "Test task!",
    schedule: {},
    isActive: true,
  };

  const tree = renderer
    .create(<Item task={task} onPress={() => undefined} />)
    .toJSON();

  expect(tree).toMatchSnapshot("Item-active");
});

it("Item renders inactive task", () => {
  const task = {
    id: "test",
    created: new Date(),
    title: "Test inactive task!",
    schedule: {},
    isActive: false,
  };

  const tree = renderer
    .create(<Item task={task} onPress={() => undefined} />)
    .toJSON();

  expect(tree).toMatchSnapshot("Item-inactive");
});

it("Item handless press", () => {
  const task = {
    id: "test",
    created: new Date(),
    title: "Test task!",
    schedule: {},
    isActive: true,
  };

  const onPress = jest.fn(() => undefined);

  const component = renderer.create(<Item task={task} onPress={onPress} />)
    .root;

  const touchable = component.findByProps({ testID: "task-item" });
  expect(touchable).toBeTruthy();

  act(() => touchable.props.onPress());
  expect(onPress.mock.calls).toEqual([[]]);
});
