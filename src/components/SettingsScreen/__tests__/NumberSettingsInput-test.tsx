import React from "react";
import renderer, { act } from "react-test-renderer";
import NumberSettingsInput from "../NumberSettingsInput";

const label = "Frequency";
const gt10 = (value: number) => value > 10;
const onChangeIgnore = (_: number) => undefined;

it("NumberSettingsInput renders input with valid number", () => {
  const tree = renderer
    .create(
      <NumberSettingsInput
        label={label}
        value={12}
        validate={gt10}
        onChange={onChangeIgnore}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("NumberSettingsInput-valid");
});

it("NumberSettingsInput renders input with invalid number", () => {
  const tree = renderer
    .create(
      <NumberSettingsInput
        label={label}
        value={1}
        validate={gt10}
        onChange={onChangeIgnore}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("NumberSettingsInput-invalid");
});

it("NumberSettingsInput changes number", () => {
  let changableValue: number | undefined;
  const onChange = (newValue: number) => (changableValue = newValue);

  const component = renderer.create(
    <NumberSettingsInput
      label={label}
      value={1}
      validate={gt10}
      onChange={onChange}
    />,
  ).root;

  const textInput = component.findByProps({
    testID: "number-settings-input-text-input",
  });
  expect(textInput).toBeTruthy();

  act(() => {
    textInput.props.onChangeText("22");
  });
  expect(changableValue).toBe(22);
});
