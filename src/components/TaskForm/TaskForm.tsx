import React, { useCallback } from "react";
import { TextInput, View } from "react-native";
import Task, { isTitleValid } from "../../dto/Task";
import TaskSchedule from "../../dto/TaskSchedule";
import ScheduleInput from "./ScheduleInput";
import styles from "./styles";

interface Props {
  task: Task;

  scheduleStartHour: number;
  scheduleEndHour: number;

  onChange: (task: Task) => void;
}

/** A form for creating/editing a task. */
export default ({
  task,
  scheduleStartHour,
  scheduleEndHour,
  onChange,
}: Props) => {
  const updateTask = useCallback(
    (changes: { title?: string; schedule?: TaskSchedule }) =>
      onChange({
        ...task,
        ...changes,
      }),
    [task, onChange],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isTitleValid(task.title) ? styles.inputValid : styles.inputInvalid,
        ]}
        placeholder="Name of the annoyance"
        onChangeText={title => updateTask({ title })}
        value={task.title}
        testID="title-input"
      />
      <ScheduleInput
        schedule={task.schedule}
        startHour={scheduleStartHour}
        endHour={scheduleEndHour}
        onChange={schedule => updateTask({ schedule })}
        testID="schedule-input"
      />
    </View>
  );
};
