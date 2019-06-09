import React, { useRef } from "react";
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "react-navigation-hooks";
import * as colors from "../../colors";
import * as routes from "../../navigation/routes";

export default () => {
  const { navigate } = useNavigation();
  const actionRef = useRef<any>(null);

  return (
    <FloatingAction
      position="right"
      color={colors.green400}
      showBackground={false}
      onPressMain={() => {
        navigate(routes.CREATE);
        setTimeout(actionRef.current.reset, 500);
      }}
      ref={actionRef}
    />
  );
};
