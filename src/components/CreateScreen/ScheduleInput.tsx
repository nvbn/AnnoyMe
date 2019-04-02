import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { range, fromPairs } from "lodash";
import { eachDay, startOfWeek, endOfWeek, format } from "date-fns";
import { AnnoySchedule } from "../../types";
import styles from "./styles";

interface Props {
  startHour: number;
  endHour: number;
  schedule: AnnoySchedule;

  onChange: (schedule: AnnoySchedule) => void;
}

export default class ScheduleInput extends PureComponent<Props> {
  isSelected = (weekDayNumber: number, hour: number) => {
    const hours = this.props.schedule[weekDayNumber + 1];

    return hours && hours[hour];
  };

  toggle = (weekDayNumber: number, hour: number) => {
    const hours = { ...this.props.schedule[weekDayNumber + 1] } || {};
    hours[hour] = !hours[hour];

    this.props.onChange({
      ...this.props.schedule,
      [weekDayNumber + 1]: hours,
    });
  };

  toggleHour = (hour: number) => {
    const alreadySelected = range(1, 8)
      .map(n => this.props.schedule[n] || {})
      .map(hours => hours[hour])
      .filter(selected => selected === true);

    const shouldBeSelected = alreadySelected.length !== 7;

    const schedule = { ...this.props.schedule };
    for (const weekday of range(1, 8)) {
      const hours = schedule[weekday] || {};
      schedule[weekday] = { ...hours, [hour]: shouldBeSelected };
    }

    this.props.onChange(schedule);
  };

  toggleWeekDay = (weekDayNumber: number) => {
    const alreadySelected = range(this.props.startHour, this.props.endHour + 1)
      .map(n => (this.props.schedule[weekDayNumber + 1] || {})[n])
      .filter(selected => selected === true);

    const shouldBeSelected =
      alreadySelected.length !== this.props.endHour - this.props.startHour + 1;

    this.props.onChange({
      ...this.props.schedule,
      [weekDayNumber + 1]: fromPairs(
        range(this.props.startHour, this.props.endHour + 1).map(hour => [
          hour,
          shouldBeSelected,
        ]),
      ),
    });
  };

  render() {
    const now = new Date();
    const weekdayRange = eachDay(
      startOfWeek(now, { weekStartsOn: 1 }),
      endOfWeek(now, { weekStartsOn: 1 }),
    ).map(day => format(day, "dd"));
    const hourRange = range(this.props.startHour, this.props.endHour + 1);

    return (
      <View style={styles.scheduleInputContainer}>
        <View style={styles.scheduleInputLine}>
          <View
            style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]}
          />
          {weekdayRange.map((weekDay, n) => (
            <TouchableOpacity
              key={`week-day-label-${n}`}
              style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]}
              onPress={e => this.toggleWeekDay(n)}
            >
              <Text style={styles.scheduleInputLabel}>{weekDay}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {hourRange.map(hour => (
          <View key={`hour-label-${hour}`} style={styles.scheduleInputLine}>
            <TouchableOpacity
              style={[styles.scheduleInputBox, styles.scheduleInputLabelBox]}
              onPress={e => this.toggleHour(hour)}
            >
              <Text style={styles.scheduleInputLabel}>{hour}</Text>
            </TouchableOpacity>
            {weekdayRange.map((weekDay, n) => (
              <TouchableOpacity
                key={`hour-week-day-${hour}-${n}`}
                style={[
                  styles.scheduleInputBox,
                  this.isSelected(n, hour)
                    ? styles.scheduleInputBoxSelected
                    : styles.scheduleInputBoxNotSelected,
                ]}
                onPress={e => this.toggle(n, hour)}
              >
                <View />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  }
}
