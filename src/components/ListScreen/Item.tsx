import React from "react";
import { Text, TouchableOpacity } from "react-native";
import TaskWithStatus from "../../dto/TaskWithStatus";
import styles from "./styles";

interface Props {
  task: TaskWithStatus;

  onPress: () => void;
}

export default ({ task, onPress }: Props) => (
  <TouchableOpacity
    style={[
      styles.itemContainer,
      task.isActive ? styles.itemActive : styles.itemInactive,
    ]}
    onPress={onPress}
  >
    <Text style={styles.itemTitle}>{task.title}</Text>
  </TouchableOpacity>
);
