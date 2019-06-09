import React from "react";
import { useNavigation } from "react-navigation-hooks";
import HeaderButtons from "react-navigation-header-buttons";
import * as routes from "../../navigation/routes";
import HeaderButton from "../HeaderButton";

export default () => {
  const { navigate } = useNavigation();

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <HeaderButtons.Item
        title="Settings"
        iconName="settings"
        onPress={() => navigate(routes.SETTINGS)}
      />
    </HeaderButtons>
  );
};
