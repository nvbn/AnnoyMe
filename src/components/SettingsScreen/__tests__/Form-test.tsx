import React from "react";
import renderer, { act } from "react-test-renderer";
import Settings from "../../../dto/Settings";
import Form from "../Form";

const settings = {
  startHour: 10,
  endHour: 23,
  frequency: 45,
};

const onChangeIgnore = (_: Settings) => undefined;

it("Form renders settings form", () => {
  const tree = renderer
    .create(<Form settings={settings} onChange={onChangeIgnore} />)
    .toJSON();

  expect(tree).toMatchSnapshot("Form-settings");
});

const assertInputChange = (
  testID: string,
  value: number,
  settingsBefore: Settings,
  settingsAfter: Settings,
) => {
  let changeableSettings: Settings | undefined;
  const onChange = (newSettings: Settings) =>
    (changeableSettings = newSettings);

  const component = renderer.create(
    <Form settings={settingsBefore} onChange={onChange} />,
  ).root;

  const input = component.findByProps({ testID });
  expect(input).toBeTruthy();

  act(() => {
    input.props.onChange(value);
  });
  expect(changeableSettings).toEqual(settingsAfter);
};

it("Form changes start hour", () =>
  assertInputChange("start-hour-input", 14, settings, {
    startHour: 14,
    endHour: 23,
    frequency: 45,
  }));

it("Form changes end hour", () =>
  assertInputChange("end-hour-input", 21, settings, {
    startHour: 10,
    endHour: 21,
    frequency: 45,
  }));

it("Form changes frequency", () =>
  assertInputChange("frequency-input", 100, settings, {
    startHour: 10,
    endHour: 23,
    frequency: 100,
  }));
