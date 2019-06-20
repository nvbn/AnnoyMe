import React, { useRef, useCallback } from "react";
import { FloatingAction } from "react-native-floating-action";
import * as colors from "../../constants/colors";

interface Props {
  onPress: () => void;
}

export default ({ onPress }: Props) => {
  const actionRef = useRef<any>(null);

  const pressAndReset = useCallback(() => {
    onPress();
    setTimeout(actionRef.current.reset, 500);
  }, [onPress, actionRef]);

  return (
    <FloatingAction
      position="right"
      color={colors.green400}
      showBackground={false}
      onPressMain={pressAndReset}
      ref={actionRef}
    />
  );
};
