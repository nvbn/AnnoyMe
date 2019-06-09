import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { range } from "lodash";
import { eachDay, startOfWeek, endOfWeek, format } from "date-fns";
import { TaskSchedule } from "../../types";
import useScheduleManager from "./scheduleManager";
import styles from "./styles";

interface Props {
  startHour: number;
  endHour: number;
  schedule: TaskSchedule;

  onChange: (schedule: TaskSchedule) => void;
}

const useWeekdayRange = () =>
  useMemo(() => {
    const now = new Date();

    return eachDay(
      startOfWeek(now, { weekStartsOn: 1 }),
      endOfWeek(now, { weekStartsOn: 1 }),
    ).map(day => format(day, "dd"));
  }, []);

export default ({ startHour, endHour, schedule, onChange }: Props) => {
  const weekdayRange = useWeekdayRange();
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
            key={`week-day-label-${n}`}
            style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]}
            onPress={_ => toggleWeekday(n)}
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
          >
            <Text style={styles.scheduleInputLabel}>{hour}</Text>
          </TouchableOpacity>
          {weekdayRange.map((_, n) => (
            <TouchableOpacity
              key={`hour-week-day-${hour}-${n}`}
              style={[
                styles.scheduleInputBox,
                isSelected(n, hour)
                  ? styles.scheduleInputBoxSelected
                  : styles.scheduleInputBoxNotSelected,
              ]}
              onPress={_ => toggle(n, hour)}
            >
              <View />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
