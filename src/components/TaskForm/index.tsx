import React from "react";
import { View, TextInput } from "react-native";
import { TaskSchedule, TaskChanges } from "../../types";
import ScheduleInput from "./ScheduleInput";
import { useTitleInputManager, useScheduleInputManager } from "./inputManagers";
import styles from "./styles";

interface Props {
  title: string;
  schedule: TaskSchedule;

  startHour: number;
  endHour: number;

  onChange: (changes: TaskChanges) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default ({
  title,
  schedule,
  startHour,
  endHour,
  onChange,
  onValidationChange,
}: Props) => {
  const { formTitle, isTitleValid, onTitleChange } = useTitleInputManager(
    title,
    onChange,
    onValidationChange,
  );

  const { formSchedule, onScheduleChange } = useScheduleInputManager(
    schedule,
    onChange,
  );

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
