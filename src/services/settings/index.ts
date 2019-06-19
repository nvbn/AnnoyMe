import * as constants from "../../constants";
import { Settings } from "../../types";
import IStorageService from "../storage/IStorageService";
import ISettingsService from "./ISettingsService";

export default class SettingsService implements ISettingsService {
  storage: IStorageService;

  constructor(storage: IStorageService) {
    this.storage = storage;
  }

  public async read(): Promise<Settings> {
    try {
      const settings = await this.storage.read<Settings>();

      return settings || constants.DEFAULT_SETTINGS;
    } catch (e) {
      console.error("Unable to read settings, falling back to default", e);

      return constants.DEFAULT_SETTINGS;
    }
  }

  public async save(settings: Settings): Promise<void> {
    return await this.storage.write(settings);
  }
}
