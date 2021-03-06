import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderButtons, { HeaderButton } from "react-navigation-header-buttons";

const HeaderButtonComponent = <T extends {}>(options: T) => (
  <HeaderButton {...options as any} IconComponent={Icon} iconSize={23} />
);

interface Props {
  onPress: () => void;
}

/** Right header button for navigator that points to settings. */
export default ({ onPress }: Props) => (
  <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
    <HeaderButtons.Item
      title="Settings"
      iconName="settings"
      onPress={onPress}
      testID="header-button"
    />
  </HeaderButtons>
);
