import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Annoy } from "../../types";
import styles from "./styles";

interface Props {
  item: Annoy;
  onPress: () => void;
}

export default ({ item, onPress }: Props) => (
  <TouchableOpacity
    style={[
      styles.itemContainer,
      item.isActiveNow ? styles.itemActive : styles.itemInactive,
    ]}
    onPress={onPress}
  >
    <Text style={styles.itemTitle}>{item.title}</Text>
  </TouchableOpacity>
);
