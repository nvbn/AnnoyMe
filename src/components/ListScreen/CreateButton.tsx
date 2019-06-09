import React, { useRef } from "react";
import { FloatingAction } from "react-native-floating-action";
import * as colors from "../../colors";

interface Props {
  onPress: () => void;
}

export default ({ onPress }: Props) => {
  const actionRef = useRef<any>(null);

  return (
    <FloatingAction
      position="right"
      color={colors.green400}
      showBackground={false}
      onPressMain={() => {
        onPress();
        setTimeout(actionRef.current.reset, 500);
      }}
      ref={actionRef}
    />
  );
};
