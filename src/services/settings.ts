import { AsyncStorageStatic } from "@react-native-community/async-storage";
import * as constants from "../constants";
import { Settings } from "../types";

export default class SettingsService {
  storage: AsyncStorageStatic;

  constructor(storage: AsyncStorageStatic) {
    this.storage = storage;
  }

  public async read(): Promise<Settings> {
    try {
      const settings = await this.settingsFromStorage();

      return settings || constants.DEFAULT_SETTINGS;
    } catch (e) {
      console.error("Unable to read settings, falling back to default", e);

      return constants.DEFAULT_SETTINGS;
    }
  }

  private async settingsFromStorage(): Promise<Settings | undefined> {
    const rawSettings = await this.storage.getItem(
      constants.STORAGE_SETTINGS_KEY,
    );

    if (rawSettings) {
      return JSON.parse(rawSettings);
    } else {
      return;
    }
  }

  public async save(settings: Settings): Promise<void> {
    const serialzied = JSON.stringify(settings);

    await this.storage.setItem(constants.STORAGE_SETTINGS_KEY, serialzied);
  }
}
