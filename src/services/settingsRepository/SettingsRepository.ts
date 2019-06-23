import Settings from "../../dto/Settings";
import IStorageService from "../storage/IStorageService";
import ISettingsRepository from "./ISettingsRepository";

/** A service for working with settings stored in a persistent storage. */
export default class SettingsRepository implements ISettingsRepository {
  private storage: IStorageService;
  private defaultValue: Settings;

  constructor(storage: IStorageService, defaultValue: Settings) {
    this.storage = storage;
    this.defaultValue = defaultValue;
  }

  /** Asynchronously reads settings from persistent storage, returns default value if data isn,t available. */
  public async read(): Promise<Settings> {
    try {
      const settings = await this.storage.read<Settings>();

      return settings || this.defaultValue;
    } catch (e) {
      console.error("Unable to read settings, falling back to default", e);

      return this.defaultValue;
    }
  }

  /** Asynchronously saves settings to persistent storage.
   *
   * @param settings settings object to store
   */
  public async save(settings: Settings): Promise<void> {
    return await this.storage.write(settings);
  }
}
