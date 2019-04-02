import React from "react";
import { Text, View } from "react-native";
import { Annoy } from "../../types";
import styles from "./styles";

interface Props {
  item: Annoy;
}

export default ({ item }: Props) => (
  <View
    style={[
      styles.itemContainer,
      item.isActiveNow ? styles.itemActive : styles.itemInactive,
    ]}
  >
    <Text style={styles.itemTitle}>{item.title}</Text>
  </View>
);
