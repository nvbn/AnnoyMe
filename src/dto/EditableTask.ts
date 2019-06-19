import Task from "./Task";

/** Task that can be edited and with validation status. */
export default interface EditableTask extends Task {
  isValid: boolean;
}
