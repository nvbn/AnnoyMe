import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Task } from "../../services/tasks/types";
import styles from "./styles";

interface Props {
  task: Task;
  isActive: boolean;

  onPress: () => void;
}

export default ({ task, isActive, onPress }: Props) => (
  <TouchableOpacity
    style={[
      styles.itemContainer,
      isActive ? styles.itemActive : styles.itemInactive,
    ]}
    onPress={onPress}
  >
    <Text style={styles.itemTitle}>{task.title}</Text>
  </TouchableOpacity>
);
