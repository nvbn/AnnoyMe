import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { TaskSchedule, TaskChanges } from "../../types";
import ScheduleInput from "../ScheduleInput";
import styles from "./styles";

interface Props {
  title: string;
  schedule: TaskSchedule;

  startHour: number;
  endHour: number;

  onChange: (changes: TaskChanges) => void;
  onValidationChange: (isValid: boolean) => void;
}

const validateTitle = (title: string) => title.length > 0;

export default ({
  title,
  schedule,
  startHour,
  endHour,
  onChange,
  onValidationChange,
}: Props) => {
  const [formTitle, setFormTitle] = useState(title);
  const [isTitleValid, setIsTitleValid] = useState(validateTitle(formTitle));
  const [formSchedule, setFormSchedule] = useState(schedule);

  const onTitleChange = (newTitle: string) => {
    setFormTitle(newTitle);
    const isValid = validateTitle(newTitle);
    if (isValid !== isTitleValid) {
      setIsTitleValid(isValid);
      onValidationChange(isValid);
    }

    onChange({ title: newTitle });
  };

  const onScheduleChange = (newSchedule: TaskSchedule) => {
    setFormSchedule(newSchedule);

    onChange({ schedule: newSchedule });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isTitleValid ? styles.inputValid : styles.inputInvalid,
        ]}
        placeholder="Name of the annoyance"
        onChangeText={onTitleChange}
        defaultValue={formTitle}
      />
      <ScheduleInput
        schedule={formSchedule}
        startHour={startHour}
        endHour={endHour}
        onChange={onScheduleChange}
      />
    </View>
  );
};
