import { AsyncStorageStatic } from "@react-native-community/async-storage";
import IStorageService from "./IStorageService";

/** Wrapper around AsyncStorage for storing json data as one item. */
export default class JSONAsyncStorageService implements IStorageService {
  private lowLevelStorage: AsyncStorageStatic;
  private storageKey: string;

  constructor(lowLevelStorage: AsyncStorageStatic, storageKey: string) {
    this.lowLevelStorage = lowLevelStorage;
    this.storageKey = storageKey;
  }

  /** Asynchronously reads data from AsyncStorage, returns undefined when data isn't available. */
  public async read<T>(): Promise<T | undefined> {
    const rawData = await this.lowLevelStorage.getItem(this.storageKey);

    if (rawData) {
      return JSON.parse(rawData);
    }

    return;
  }

  /** Asynchronously writes data to AsyncStorage. */
  public async write<T>(data: T): Promise<void> {
    const serialized = JSON.stringify(data);

    await this.lowLevelStorage.setItem(this.storageKey, serialized);
  }
}
