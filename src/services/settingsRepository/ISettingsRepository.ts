import Settings from "../../dto/Settings";

export default interface ISettingsRepository {
  /** Asynchronously reads settings from persistent storage. */
  read(): Promise<Settings>;

  /** Asynchronously saves settings to persistent storage.
   *
   * @param settings settings object to store
   */
  save(settings: Settings): Promise<void>;
}
