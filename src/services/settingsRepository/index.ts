import Settings from "../../dto/Settings";
import IStorageService from "../storage/IStorageService";
import ISettingsRepository from "./ISettingsRepository";

export default class SettingsRepository implements ISettingsRepository {
  public storage: IStorageService;
  public defaultValue: Settings;

  constructor(storage: IStorageService, defaultValue: Settings) {
    this.storage = storage;
    this.defaultValue = defaultValue;
  }

  public async read(): Promise<Settings> {
    try {
      const settings = await this.storage.read<Settings>();

      return settings || this.defaultValue;
    } catch (e) {
      console.error("Unable to read settings, falling back to default", e);

      return this.defaultValue;
    }
  }

  public async save(settings: Settings): Promise<void> {
    return await this.storage.write(settings);
  }
}
