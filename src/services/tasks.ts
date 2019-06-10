import { AsyncStorageStatic } from "react-native";
import { find, findIndex, remove } from "lodash";
import uuidv4 from "uuid/v4";
import { Task } from "../types";
import * as constants from "../constants";

export default class TasksService {
  storage: AsyncStorageStatic;

  constructor(storage: AsyncStorageStatic) {
    this.storage = storage;
  }

  public async getAll(): Promise<Task[]> {
    try {
      const tasks = await this.tasksFromStorage();

      if (tasks === undefined) {
        return constants.DEFAULT_TASKS;
      } else {
        return tasks;
      }
    } catch (e) {
      console.error("Unable to read tasks", e);

      return constants.DEFAULT_TASKS;
    }
  }

  public async save(task: Task): Promise<void> {
    let tasks = [...(await this.getAll())];

    const currentIndex = findIndex(tasks, { id: task.id });
    if (currentIndex === -1) {
      tasks.push(task);
    } else {
      tasks[currentIndex] = task;
    }

    await this.tasksToStorage(tasks);
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
    const tasks = await this.getAll();
    const afterRemoved = remove(tasks, { id });

    await this.tasksToStorage(afterRemoved);
  }

  public emptyTask(): Task {
    return {
      id: uuidv4(),
      title: "",
      created: new Date(),
      schedule: {},
    };
  }

  private async tasksFromStorage(): Promise<Task[] | undefined> {
    const rawTasks = await this.storage.getItem(constants.STORAGE_TASKS_KEY);

    if (rawTasks) {
      return JSON.parse(rawTasks);
    } else {
      return;
    }
  }

  private async tasksToStorage(tasks: Task[]): Promise<void> {
    const serialized = JSON.stringify(tasks);

    await this.storage.setItem(constants.STORAGE_TASKS_KEY, serialized);
  }
}
