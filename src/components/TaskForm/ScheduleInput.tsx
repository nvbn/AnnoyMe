import { eachDay, endOfWeek, format, startOfWeek } from "date-fns";
import { range } from "lodash";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TaskSchedule from "../../dto/TaskSchedule";
import useScheduleManager from "./scheduleManager";
import styles from "./styles";

interface Props {
  startHour: number;
  endHour: number;
  schedule: TaskSchedule;

  onChange: (schedule: TaskSchedule) => void;

  testID?: string;
}

const getWeekdayRange = () => {
  const now = new Date();

  return eachDay(
    startOfWeek(now, { weekStartsOn: 1 }),
    endOfWeek(now, { weekStartsOn: 1 }),
  ).map(day => format(day, "dd"));
};

/** A special input for selecting/deselecting hours by week days. */
export default ({ startHour, endHour, schedule, onChange }: Props) => {
  const weekdayRange = useMemo(getWeekdayRange, []);
  const hourRange = useMemo(() => range(startHour, endHour + 1), []);

  const { isSelected, toggle, toggleHour, toggleWeekday } = useScheduleManager(
    schedule,
    startHour,
    endHour,
    onChange,
  );

  return (
    <View style={styles.scheduleInputContainer}>
      <View style={styles.scheduleInputLine}>
        <View style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]} />
        {weekdayRange.map((weekDay, n) => (
          <TouchableOpacity
            key={`weekday-label-${n}`}
            style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]}
            onPress={_ => toggleWeekday(n)}
            testID={`weekday-${n}`}
          >
            <Text style={styles.scheduleInputLabel}>{weekDay}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {hourRange.map(hour => (
        <View key={`hour-label-${hour}`} style={styles.scheduleInputLine}>
          <TouchableOpacity
            style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]}
            onPress={_ => toggleHour(hour)}
            testID={`hour-${hour}`}
          >
            <Text style={styles.scheduleInputLabel}>{hour}</Text>
          </TouchableOpacity>
          {weekdayRange.map((_, n) => (
            <TouchableOpacity
              key={`hour-weekday-${hour}-${n}`}
              style={[
                styles.scheduleInputBox,
                isSelected(n, hour)
                  ? styles.scheduleInputBoxSelected
                  : styles.scheduleInputBoxNotSelected,
              ]}
              onPress={_ => toggle(n, hour)}
              testID={`hour-weekday-${n}-${hour}`}
            >
              <View />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
