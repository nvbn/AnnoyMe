import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

/** Loading indicator, mostly used with Suspend. */
const Loading = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Loading...</Text>
  </View>
);

export default Loading;
