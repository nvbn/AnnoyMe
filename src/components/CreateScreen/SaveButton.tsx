import React from "react";
import { FloatingAction } from "react-native-floating-action";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as colors from "../../colors";

interface Props {
  onPress: () => void;
}

export default ({ onPress }: Props) => (
  <FloatingAction
    position="right"
    color={colors.green400}
    showBackground={false}
    onPressMain={onPress}
    floatingIcon={<Icon name="save" size={25} color="white" />}
  />
);
