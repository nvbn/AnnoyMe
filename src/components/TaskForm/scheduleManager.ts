import { useState, useCallback } from "react";
import { range, fromPairs } from "lodash";
import { TaskSchedule } from "../../types";

const makeToggle = (
  formSchedule: TaskSchedule,
  onChange: (schedule: TaskSchedule) => void,
) => (weekDayNumber: number, hour: number) => {
  const hours = { ...formSchedule[weekDayNumber + 1] } || {};
  hours[hour] = !hours[hour];

  onChange({
    ...formSchedule,
    [weekDayNumber + 1]: hours,
  });
};

const makeToggleHour = (
  formSchedule: TaskSchedule,
  onChange: (schedule: TaskSchedule) => void,
) => (hour: number) => {
  const alreadySelected = range(1, 8)
    .map(n => formSchedule[n] || {})
    .map(hours => hours[hour])
    .filter(selected => selected === true);

  const shouldBeSelected = alreadySelected.length !== 7;

  const newSchedule = { ...formSchedule };
  for (const weekday of range(1, 8)) {
    const hours = newSchedule[weekday] || {};
    newSchedule[weekday] = { ...hours, [hour]: shouldBeSelected };
  }

  onChange(newSchedule);
};

const makeToggleWeekday = (
  formSchedule: TaskSchedule,
  startHour: number,
  endHour: number,
  onChange: (schedule: TaskSchedule) => void,
) => (weekDayNumber: number) => {
  const alreadySelected = range(startHour, endHour + 1)
    .map(n => (formSchedule[weekDayNumber + 1] || {})[n])
    .filter(selected => selected === true);

  const shouldBeSelected = alreadySelected.length !== endHour - startHour + 1;

  onChange({
    ...formSchedule,
    [weekDayNumber + 1]: fromPairs(
      range(startHour, endHour + 1).map(hour => [hour, shouldBeSelected]),
    ),
  });
};

export default (
  schedule: TaskSchedule,
  startHour: number,
  endHour: number,
  onChange: (schedule: TaskSchedule) => void,
) => {
  const [formSchedule, setFormSchedule] = useState(schedule);
  const isSelected = useCallback(
    (weekDayNumber: number, hour: number) => {
      const hours = formSchedule[weekDayNumber + 1];

      return hours && hours[hour];
    },
    [formSchedule],
  );

  const applyChanges = useCallback(
    (newSchedule: TaskSchedule) => {
      setFormSchedule(newSchedule);
      onChange(newSchedule);
    },
    [onChange],
  );

  const toggle = useCallback(makeToggle(formSchedule, applyChanges), [
    formSchedule,
    applyChanges,
  ]);

  const toggleHour = useCallback(makeToggleHour(formSchedule, applyChanges), [
    formSchedule,
    applyChanges,
  ]);

  const toggleWeekday = useCallback(
    makeToggleWeekday(formSchedule, startHour, endHour, applyChanges),
    [formSchedule, applyChanges],
  );

  return {
    isSelected,
    toggle,
    toggleHour,
    toggleWeekday,
  };
};
