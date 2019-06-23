import { find, findIndex } from "lodash";
import uuidv4 from "uuid/v4";
import Task from "../../dto/Task";
import IStorageService from "../storage/IStorageService";
import ITasksRepository from "./ITasksReposiotry";

export default class TasksRepository implements ITasksRepository {
  private storage: IStorageService;
  private defaultValue: Task[];

  constructor(storage: IStorageService, defaultValue: Task[]) {
    this.storage = storage;
    this.defaultValue = defaultValue;
  }

  /** Asynchronously reads all available tasks, returns default value when data isn't available. */
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

  /** Asynchronously updates already existing task in a storage.
   *
   * @param task task to save
   */
  public async save(task: Task): Promise<void> {
    const tasks = [...(await this.getAll())];

    const currentIndex = findIndex(tasks, { id: task.id });
    if (currentIndex === -1) {
      console.warn("Can't update not created tasks", task);

      return;
    }

    tasks[currentIndex] = task;

    await this.storage.write(tasks);
  }

  /** Asynchronously creates and stores a new task.
   *
   * @param task new task
   */
  public async create(task: Task): Promise<void> {
    const tasks = await this.getAll();

    await this.storage.write([
      task,
      ...tasks.filter(({ id }) => id !== task.id),
    ]);
  }

  /** Asynchronously reads task by id, returns empty task with that id when isn't available.
   *
   * @param id task identifier
   */
  public async getOne(id: string): Promise<Task> {
    const tasks = await this.getAll();

    const task = find(tasks, { id });

    if (task) {
      return task;
    }
    // It's an unexpected situation when we're not able to find task
    console.warn("Unable to find task");

    return { ...this.emptyTask(), id };
  }

  /** Asynchronously deletes task from a storage.
   *
   * @param id task id to delete
   */
  public async delete(removeId: string): Promise<void> {
    const tasks = await this.getAll();

    await this.storage.write(tasks.filter(({ id }) => id !== removeId));
  }

  /** Returns an empty task not stored in a storage. */
  public emptyTask(): Task {
    return {
      id: uuidv4(),
      title: "",
      created: new Date(),
      schedule: {},
    };
  }
}
