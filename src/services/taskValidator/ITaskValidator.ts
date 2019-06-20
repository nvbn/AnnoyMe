import Task from "../../dto/Task";

export default interface ITaskValidator {
  isActive(task: Task, time: Date): boolean;
  isTitleValid(title?: string): boolean;
  isValid({ title }: Task): boolean;
}
