import React from "react";
import { FloatingAction } from "react-native-floating-action";
import renderer, { act } from "react-test-renderer";
import CreateButton from "../CreateButton";

it("CreateButton renders button", () => {
  const tree = renderer
    .create(<CreateButton onPress={() => undefined} />)
    .toJSON();

  expect(tree).toMatchSnapshot("CreateButton-button");
});

it("CreateButton handles clicks", () => {
  jest.useFakeTimers();

  const onPress = jest.fn(() => undefined);

  const component = renderer.create(<CreateButton onPress={onPress} />).root;

  const button = component.findByType(FloatingAction);
  expect(button).toBeTruthy();

  act(() => {
    button.props.onPressMain();
    jest.runAllTimers();
  });

  expect(onPress.mock.calls).toEqual([[]]);

  jest.useRealTimers();
});
