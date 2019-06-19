export default interface IStorageService {
  read<T>(): Promise<T | undefined>;
  write<T>(data: T): Promise<void>;
}
