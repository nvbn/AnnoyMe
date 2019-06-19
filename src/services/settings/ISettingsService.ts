import Settings from "../../dto/Settings";

export default interface ISettingsService {
  read(): Promise<Settings>;

  save(settings: Settings): Promise<void>;
}
