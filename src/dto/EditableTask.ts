import Task from "./Task";

export default interface EditableTask extends Task {
  isValid: boolean;
}
