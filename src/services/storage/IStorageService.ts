export default interface IStorageService {
  /** Asynchronously reads data from the storage, returns undefined when data isn't available. */
  read<T>(): Promise<T | undefined>;

  /** Asynchronously writes data to the storage. */
  write<T>(data: T): Promise<void>;
}
