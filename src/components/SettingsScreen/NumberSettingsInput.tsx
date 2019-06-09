import React, { useState, useCallback } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";

interface Props {
  label: string;
  value: number;

  validate: (value: number) => boolean;
  onValidChange: (value: number) => void;
}

export default ({ label, value, validate, onValidChange }: Props) => {
  const [isValid, setIsValid] = useState(validate(value));

  const onValueChange = useCallback(
    (newValue: string) => {
      const asNumber = Number(newValue);

      if (newValue.length && !isNaN(asNumber) && validate(asNumber)) {
        onValidChange(asNumber);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    },
    [onValidChange, setIsValid, validate],
  );

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isValid ? styles.inputValid : styles.inputInvalid,
        ]}
        defaultValue={(value || "").toString()}
        onChangeText={onValueChange}
        keyboardType="number-pad"
      />
    </View>
  );
};
