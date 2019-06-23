import SettingsRepository from "../SettingsRepository";

it("SettingsRepository reads settings from a storage", async () => {
  const storedSettings = {
    startHour: 10,
    endHour: 20,
    frequency: 30,
  };
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedSettings))),
  };

  const settingsRepository = new SettingsRepository(storage as any, {} as any);

  const receivedSettings = await settingsRepository.read();

  expect(receivedSettings).toEqual(storedSettings);
  expect(storage.read.mock.calls).toEqual([[]]);
});

it("SettingsRepository returns default value when data isn't available in the storage", async () => {
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(undefined))),
  };
  const defaultSettings = {
    startHour: 12,
    endHour: 23,
    frequency: 45,
  };

  const settingsRepository = new SettingsRepository(
    storage as any,
    defaultSettings,
  );

  const receivedSettings = await settingsRepository.read();

  expect(receivedSettings).toEqual(defaultSettings);
  expect(storage.read.mock.calls).toEqual([[]]);
});

it("SettingsRepository saves settings in the storage", async () => {
  const storage = {
    write: jest.fn(() => new Promise(resolve => resolve())),
  };

  const settings = {
    startHour: 8,
    endHour: 21,
    frequency: 15,
  };
  const settingsRepository = new SettingsRepository(storage as any, {} as any);

  await settingsRepository.save(settings);

  expect(storage.write.mock.calls).toEqual([[settings]]);
});
