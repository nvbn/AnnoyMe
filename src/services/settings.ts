import { AsyncStorageStatic } from "@react-native-community/async-storage";
import * as constants from "../constants";
import { Settings } from "../types";

export default class SettingsService {
  storage: AsyncStorageStatic;

  constructor(storage: AsyncStorageStatic) {
    this.storage = storage;
  }

  public async read(): Promise<Settings> {
    return {
      startHour: 5,
      endHour: 10,
      frequency: 3,
    };
  }

  public async save(settings: Settings): Promise<null> {
    return null;
  }
}
