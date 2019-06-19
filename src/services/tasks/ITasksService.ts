import { Task } from "../../types";

export default interface ITasksService {
  getAll(): Promise<Task[]>;
  getOne(id: string): Promise<Task>;
  save(task: Task): Promise<void>;
  create(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  emptyTask(): Task;
}
