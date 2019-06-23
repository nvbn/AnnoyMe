import { AsyncStorageStatic } from "@react-native-community/async-storage";
import IStorageService from "./IStorageService";

export default class JSONAsyncStorageService implements IStorageService {
  public lowLevelStorage: AsyncStorageStatic;
  public storageKey: string;

  constructor(lowLevelStorage: AsyncStorageStatic, storageKey: string) {
    this.lowLevelStorage = lowLevelStorage;
    this.storageKey = storageKey;
  }

  public async read<T>(): Promise<T | undefined> {
    const rawData = await this.lowLevelStorage.getItem(this.storageKey);

    if (rawData) {
      return JSON.parse(rawData);
    }
    return;
  }

  public async write<T>(data: T): Promise<void> {
    const serialized = JSON.stringify(data);

    await this.lowLevelStorage.setItem(this.storageKey, serialized);
  }
}
