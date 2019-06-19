import React, { useCallback } from "react";
import { View, TextInput } from "react-native";
import { EditableTask, TaskSchedule } from "../../types";
import ScheduleInput from "./ScheduleInput";
import styles from "./styles";

interface Props {
  task: EditableTask;

  scheduleStartHour: number;
  scheduleEndHour: number;

  onChange: (task: EditableTask) => void;
}

export default ({
  task,
  scheduleStartHour,
  scheduleEndHour,
  onChange,
}: Props) => {
  const updateTask = useCallback(
    ({ title, schedule }: { title?: string; schedule?: TaskSchedule }) => {
      console.log(task);
      onChange({
        ...task,
        ...(title !== undefined ? { title, isValid: title.length > 0 } : {}),
        ...(schedule !== undefined ? { schedule } : {}),
      });
    },
    [task, onChange],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          task.isValid ? styles.inputValid : styles.inputInvalid,
        ]}
        placeholder="Name of the annoyance"
        onChangeText={title => updateTask({ title })}
        value={task.title}
      />
      <ScheduleInput
        schedule={task.schedule}
        startHour={scheduleStartHour}
        endHour={scheduleEndHour}
        onChange={schedule => updateTask({ schedule })}
      />
    </View>
  );
};
