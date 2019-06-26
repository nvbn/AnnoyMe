import React from "react";
import renderer, { act } from "react-test-renderer";
import HeaderRight from "../HeaderRight";

it("HeadeRight renders button for navigator header", () => {
  const tree = renderer
    .create(<HeaderRight onPress={() => undefined} />)
    .toJSON();

  expect(tree).toMatchSnapshot("HeaderRight-button");
});

it("HeaderRight handles click", () => {
  const onPress = jest.fn(() => undefined);

  const component = renderer.create(<HeaderRight onPress={onPress} />).root;

  const button = component.findByProps({ testID: "header-button" });
  expect(button).toBeTruthy();

  act(() => button.props.onPress());
  expect(onPress.mock.calls).toEqual([[]]);
});
