import { AsyncStorageStatic } from "react-native";
import uuidv4 from "uuid/v4";
import { Task } from "./types";

export default class TasksService {
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
        schedule: {},
      },
    ];
  }

  public async create(task: Task): Promise<null> {
    return null;
  }

  public emptyTask(): Task {
    return {
      id: uuidv4(),
      title: "",
      created: new Date(),
      schedule: {},
    };
  }
}
