import { last } from "lodash";
import React from "react";
import renderer, { act } from "react-test-renderer";
import { ServicesContext } from "../../../contexts";
import { makeSettingsRepository, waitForEffects } from "../../testUtils";
import SettingsScreen from "../SettingsScreen";

const settings = {
  startHour: 10,
  endHour: 22,
  frequency: 15,
};

it("SettingsScreen renders loading screen when settings not ready", () => {
  const settingsRepository = makeSettingsRepository();

  const tree = renderer
    .create(
      <ServicesContext.Provider value={{ settingsRepository } as any}>
        <SettingsScreen />
      </ServicesContext.Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot("SettingsScreen-loading");
});

it("SettingsScreen renders settings form", async () => {
  const settingsRepository = makeSettingsRepository(settings);

  const screenRenderer = renderer.create(
    <ServicesContext.Provider value={{ settingsRepository } as any}>
      <SettingsScreen />
    </ServicesContext.Provider>,
  );

  await settingsRepository.resolve();

  const tree = screenRenderer.toJSON();
  expect(tree).toMatchSnapshot("SettingsScreen-form");
});

it("SettingsScreen saves valid changes", async () => {
  const settingsRepository = makeSettingsRepository(settings);

  const screenRenderer = renderer.create(
    <ServicesContext.Provider value={{ settingsRepository } as any}>
      <SettingsScreen />
    </ServicesContext.Provider>,
  );

  await settingsRepository.resolve();

  const newSettings = {
    startHour: 12,
    endHour: 23,
    frequency: 120,
  };

  const form = screenRenderer.root.findByProps({ testID: "settings-form" });
  act(() => form.props.onChange(newSettings));

  await waitForEffects();

  expect(last(settingsRepository.save.mock.calls)).toEqual([newSettings]);
});

it("SettingsScreen ignores invalid changes", async () => {
  const settingsRepository = makeSettingsRepository(settings);

  const screenRenderer = renderer.create(
    <ServicesContext.Provider value={{ settingsRepository } as any}>
      <SettingsScreen />
    </ServicesContext.Provider>,
  );

  await settingsRepository.resolve();

  const newSettings = {
    startHour: -12,
    endHour: -23,
    frequency: -120,
  };

  const form = screenRenderer.root.findByProps({ testID: "settings-form" });
  act(() => form.props.onChange(newSettings));

  await waitForEffects();

  expect(last(settingsRepository.save.mock.calls)).not.toEqual([newSettings]);
});
