import { useState, useCallback } from "react";
import { TaskSchedule, TaskChanges } from "../../types";

const validateTitle = (title: string) => title.length > 0;

export const useTitleInputManager = (
  title: string,
  onChange: (changes: TaskChanges) => void,
  onValidationChange: (isValid: boolean) => void,
) => {
  const [formTitle, setFormTitle] = useState(title);
  const [isTitleValid, setIsTitleValid] = useState(validateTitle(formTitle));

  const onTitleChange = useCallback(
    (newTitle: string) => {
      setFormTitle(newTitle);
      const isValid = validateTitle(newTitle);
      if (isValid !== isTitleValid) {
        setIsTitleValid(isValid);
        onValidationChange(isValid);
      }
      onChange({ title: newTitle });
    },
    [setFormTitle, isTitleValid, setIsTitleValid, onValidationChange],
  );

  return { formTitle, isTitleValid, onTitleChange };
};

export const useScheduleInputManager = (
  schedule: TaskSchedule,
  onChange: (changes: TaskChanges) => void,
) => {
  const [formSchedule, setFormSchedule] = useState(schedule);

  const onScheduleChange = useCallback(
    (newSchedule: TaskSchedule) => {
      setFormSchedule(newSchedule);
      onChange({ schedule: newSchedule });
    },
    [setFormSchedule, onChange],
  );

  return { formSchedule, onScheduleChange };
};
