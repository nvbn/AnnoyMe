import { AsyncStorageStatic } from "react-native";
import { Task } from "./types";

export default class Tasks {
  storage: AsyncStorageStatic;

  constructor(storage: AsyncStorageStatic) {
    this.storage = storage;
  }

  public async getAll(): Promise<Task[]> {
    return [
      {
        id: "test",
        created: new Date(),
        title: "Hey hey!",
      },
    ];
  }
}
