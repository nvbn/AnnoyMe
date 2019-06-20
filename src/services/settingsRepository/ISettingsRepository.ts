import Settings from "../../dto/Settings";

export default interface ISettingsRepository {
  read(): Promise<Settings>;

  save(settings: Settings): Promise<void>;
}
