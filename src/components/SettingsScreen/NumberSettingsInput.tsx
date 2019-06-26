import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";

interface Props {
  label: string;
  value: number;

  validate: (value: number) => boolean;
  onChange: (value: number) => void;

  testID?: string;
}

/** Input for numbers with validation. */
export default ({ label, value, validate, onChange }: Props) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        validate(Number(value)) ? styles.inputValid : styles.inputInvalid,
      ]}
      defaultValue={(value || "").toString()}
      onChangeText={newValue => onChange(Number(newValue))}
      keyboardType="number-pad"
      testID="number-settings-input-text-input"
    />
  </View>
);
