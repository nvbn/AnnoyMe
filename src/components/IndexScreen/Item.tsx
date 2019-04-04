import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Annoy } from "../../types";
import styles from "./styles";

interface Props {
  item: Annoy;
  isActive: boolean;

  onPress: () => void;
}

export default ({ item, isActive, onPress }: Props) => (
  <TouchableOpacity
    style={[
      styles.itemContainer,
      isActive ? styles.itemActive : styles.itemInactive,
    ]}
    onPress={onPress}
  >
    <Text style={styles.itemTitle}>{item.title}</Text>
  </TouchableOpacity>
);
