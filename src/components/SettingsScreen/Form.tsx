import React from "react";
import { View } from "react-native";
import * as constants from "../../constants";
import NumberSettingsInput from "./NumberSettingsInput";
import styles from "./styles";

const isValidHour = (hour: number) => hour >= 0 && hour <= 24;

const isValidFrequency = (minutes: number) =>
  minutes >= constants.MIN_FREQUENCY && minutes <= 120;

interface Props {
  startHour: number;
  endHour: number;
  frequency: number;

  onNumberSettingsChange: (key: string, value: number) => void;
}

export default ({
  startHour,
  endHour,
  frequency,
  onNumberSettingsChange,
}: Props) => (
  <View style={styles.container}>
    <NumberSettingsInput
      label="Annoy from hour"
      value={startHour}
      validate={isValidHour}
      onValidChange={val => onNumberSettingsChange("startHour", val)}
    />
    <NumberSettingsInput
      label="Annoy till hour"
      value={endHour}
      validate={isValidHour}
      onValidChange={val => onNumberSettingsChange("endHour", val)}
    />
    <NumberSettingsInput
      label="Annoys frequency"
      value={frequency}
      validate={isValidFrequency}
      onValidChange={val => onNumberSettingsChange("frequency", val)}
    />
  </View>
);
