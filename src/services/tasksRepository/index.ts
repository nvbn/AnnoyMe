import { find, findIndex } from "lodash";
import uuidv4 from "uuid/v4";
import Task from "../../dto/Task";
import IStorageService from "../storage/IStorageService";
import ITasksRepository from "./ITasksReposiotry";

export default class TasksRepository implements ITasksRepository {
  public storage: IStorageService;
  public defaultValue: Task[];

  constructor(storage: IStorageService, defaultValue: Task[]) {
    this.storage = storage;
    this.defaultValue = defaultValue;
  }

  public async getAll(): Promise<Task[]> {
    try {
      const tasks = await this.storage.read<Task[]>();

      if (tasks === undefined) {
        return this.defaultValue;
      }
      return tasks;
    } catch (e) {
      console.error("Unable to read tasks", e);

      return this.defaultValue;
    }
  }

  public async save(task: Task): Promise<void> {
    const tasks = [...(await this.getAll())];

    const currentIndex = findIndex(tasks, { id: task.id });
    if (currentIndex === -1) {
      return;
    }

    tasks[currentIndex] = task;

    await this.storage.write(tasks);
  }

  public async create(task: Task): Promise<void> {
    const tasks = await this.getAll();

    await this.storage.write([task, ...tasks]);
  }

  public async getOne(id: string): Promise<Task> {
    const tasks = await this.getAll();

    const task = find(tasks, { id });

    if (task) {
      return task;
    }
    // It's an unexpected situation when we're not able to find task
    console.warn("Unable to find task");

    return this.emptyTask();
  }

  public async delete(removeId: string): Promise<void> {
    const tasks = await this.getAll();

    await this.storage.write(tasks.filter(({ id }) => id !== removeId));
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
