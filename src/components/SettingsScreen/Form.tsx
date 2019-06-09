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

  onSettingChange: <T>(key: string, value: T) => void;
}

export default ({ startHour, endHour, frequency, onSettingChange }: Props) => (
  <View style={styles.container}>
    <NumberSettingsInput
      label="Annoy from hour"
      value={startHour}
      validate={isValidHour}
      onValidChange={val => onSettingChange("startHour", val)}
    />
    <NumberSettingsInput
      label="Annoy till hour"
      value={endHour}
      validate={isValidHour}
      onValidChange={val => onSettingChange("endHour", val)}
    />
    <NumberSettingsInput
      label="Annoys frequency"
      value={frequency}
      validate={isValidFrequency}
      onValidChange={val => onSettingChange("frequency", val)}
    />
  </View>
);
