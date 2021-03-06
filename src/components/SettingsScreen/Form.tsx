import React, { useCallback } from "react";
import { View } from "react-native";
import Settings, {
  isEndHourValid,
  isFrequencyValid,
  isStartHourValid,
} from "../../dto/Settings";
import NumberSettingsInput from "./NumberSettingsInput";
import styles from "./styles";

interface Props {
  settings: Settings;

  onChange: (settings: Settings) => void;

  testID?: string;
}

/** Form for modifying settings. */
export default ({ settings, onChange }: Props) => {
  const onValueChange = useCallback(
    (changes: { startHour?: number; endHour?: number; frequency?: number }) =>
      onChange({ ...settings, ...changes }),
    [settings, onChange],
  );

  return (
    <View style={styles.container}>
      <NumberSettingsInput
        label="Annoy from hour"
        value={settings.startHour}
        validate={isStartHourValid}
        onChange={startHour => onValueChange({ startHour })}
        testID="start-hour-input"
      />
      <NumberSettingsInput
        label="Annoy till hour"
        value={settings.endHour}
        validate={isEndHourValid}
        onChange={endHour => onValueChange({ endHour })}
        testID="end-hour-input"
      />
      <NumberSettingsInput
        label="Annoys frequency"
        value={settings.frequency}
        validate={isFrequencyValid}
        onChange={frequency => onValueChange({ frequency })}
        testID="frequency-input"
      />
    </View>
  );
};
