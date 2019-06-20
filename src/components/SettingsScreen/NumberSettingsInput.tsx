import React from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";

interface Props {
  label: string;
  value: number;

  validate: (value: number) => boolean;
  onChange: (value: number) => void;
}

export default ({ label, value, validate, onChange }: Props) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        validate(Number(value)) ? styles.inputValid : styles.inputInvalid,
      ]}
      defaultValue={(value || "").toString()}
      onChangeText={value => onChange(Number(value))}
      keyboardType="number-pad"
    />
  </View>
);
