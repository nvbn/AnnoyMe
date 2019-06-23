import Task from "../../dto/Task";

export default interface ITasksRepository {
  /** Asynchronously reads all available tasks. */
  getAll(): Promise<Task[]>;

  /** Asynchronously reads task by id, returns empty task when isn't available.
   *
   * @param id task identifier
   */
  getOne(id: string): Promise<Task>;

  /** Asynchronously updates already existing task in a storage.
   *
   * @param task task to save
   */
  save(task: Task): Promise<void>;

  /** Asynchronously creates and stores a new task.
   *
   * @param task new task
   */
  create(task: Task): Promise<void>;

  /** Asynchronously deletes task from a storage.
   *
   * @param id task id to delete
   */
  delete(id: string): Promise<void>;

  /** Returns an empty task not stored in a storage. */
  emptyTask(): Task;
}
