import { AsyncStorageStatic } from "react-native";
import { find } from "lodash";
import uuidv4 from "uuid/v4";
import { Task } from "../types";

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

  public async save(task: Task): Promise<void> {
    return;
  }

  public async getOne(id: string): Promise<Task> {
    const tasks = await this.getAll();

    const task = find(tasks, { id });

    if (task) {
      return task;
    } else {
      // It's an unexpected situation when we're not able to find task
      console.warn("Unable to find task");

      return this.emptyTask();
    }
  }

  public async delete(id: string): Promise<void> {
    return;
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
