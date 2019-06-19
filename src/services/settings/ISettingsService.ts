import { Settings } from "../../types";

export default interface ISettingsService {
  read(): Promise<Settings>;

  save(settings: Settings): Promise<void>;
}
