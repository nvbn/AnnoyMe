import React, { PureComponent } from "react";
import { View } from "react-native";
import NumberSettingsInput from "./NumberSettingsInput";
import styles from "./styles";

interface Props {
  startHour: number;
  endHour: number;
  frequency: number;

  setStartHour: (value: number) => void;
  setEndHour: (value: number) => void;
  setFrequency: (value: number) => void;
}

interface State {
  startHourValid: boolean;
  endHourValid: boolean;
  frequencyValid: boolean;
}

export default class SettingsScreen extends PureComponent<Props, State> {
  static navigationOptions = {
    title: "Settings",
  };

  readonly state: State = {
    startHourValid: true,
    endHourValid: true,
    frequencyValid: true,
  };

  isValidHour = (hour: number) => hour >= 0 && hour <= 24;

  isValidFrequency = (minutes: number) => minutes >= 5 && minutes <= 120;

  render() {
    return (
      <View style={styles.container}>
        <NumberSettingsInput
          label="Annoy from hour"
          value={this.props.startHour}
          validate={this.isValidHour}
          onValidChange={this.props.setStartHour}
        />
        <NumberSettingsInput
          label="Annoy till hour"
          value={this.props.endHour}
          validate={this.isValidHour}
          onValidChange={this.props.setEndHour}
        />
        <NumberSettingsInput
          label="Annoys frequency"
          value={this.props.frequency}
          validate={this.isValidFrequency}
          onValidChange={this.props.setFrequency}
        />
      </View>
    );
  }
}
