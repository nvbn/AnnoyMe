import React from "react";
import { Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../colors";

interface Props {
  title: string;

  onYes: () => void;
}

export default ({ title, onYes }: Props) => (
  <FloatingAction
    position="right"
    color={colors.red400}
    showBackground={false}
    onPressMain={() =>
      Alert.alert(
        "Remove the annoyance",
        `Are you sure want to remove "${title}"?`,
        [
          { text: "Yes", onPress: onYes, style: "destructive" },
          { text: "No", style: "cancel" },
        ],
      )
    }
    floatingIcon={<Icon name="delete" size={25} color="white" />}
  />
);
