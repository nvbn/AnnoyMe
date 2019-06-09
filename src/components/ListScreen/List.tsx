import React from "react";
import { ScrollView } from "react-native";
import { Task } from "../../types";
import Item from "./Item";
import styles from "./styles";

interface Props {
  tasks: Task[];

  openTask: (task: Task) => void;
}

export default ({ tasks, openTask }: Props) => (
  <ScrollView contentContainerStyle={styles.container}>
    {tasks.map(task => (
      <Item
        task={task}
        isActive={false}
        key={`task-item-${task.id}`}
        onPress={() => openTask(task)}
      />
    ))}
  </ScrollView>
);
