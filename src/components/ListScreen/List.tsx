import React from "react";
import { ScrollView } from "react-native";
import TaskWithStatus from "../../dto/TaskWithStatus";
import Item from "./Item";
import styles from "./styles";

interface Props {
  tasks: TaskWithStatus[];

  onItemPress: (task: TaskWithStatus) => void;
}

/** Scrollable list of tasks. */
export default ({ tasks, onItemPress }: Props) => (
  <ScrollView contentContainerStyle={styles.container}>
    {tasks.map(task => (
      <Item
        task={task}
        key={`task-item-${task.id}`}
        onPress={() => onItemPress(task)}
        testID={`task-item-${task.id}`}
      />
    ))}
  </ScrollView>
);
