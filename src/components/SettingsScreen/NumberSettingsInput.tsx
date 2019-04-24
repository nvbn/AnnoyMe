import React, { PureComponent } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";

interface Props {
  label: string;
  value: number;

  validate: (value: number) => boolean;
  onValidChange: (value: number) => void;
}

interface State {
  isValid: boolean;
}

/**
 * Input for changing numeric settings value.
 */
export default class NumberSettingsInput extends PureComponent<Props, State> {
  readonly state: State = {
    isValid: true,
  };

  onChange = (value: string) => {
    const asNumber = Number(value);

    if (value.length && !isNaN(asNumber) && this.props.validate(asNumber)) {
      this.props.onValidChange(asNumber);
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{this.props.label}</Text>
        <TextInput
          style={[
            styles.input,
            this.state.isValid ? styles.inputValid : styles.inputInvalid,
          ]}
          defaultValue={this.props.value.toString()}
          onChangeText={this.onChange}
          keyboardType="number-pad"
        />
      </View>
    );
  }
}
