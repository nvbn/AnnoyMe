import React from "react";
import HeaderButtons, { HeaderButton } from "react-navigation-header-buttons";
import Icon from "react-native-vector-icons/MaterialIcons";

const HeaderButtonComponent = <T extends {}>(options: T) => (
  <HeaderButton {...options as any} IconComponent={Icon} iconSize={23} />
);

interface Props {
  onPress: () => void;
}

export default ({ onPress }: Props) => (
  <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
    <HeaderButtons.Item
      title="Settings"
      iconName="settings"
      onPress={onPress}
    />
  </HeaderButtons>
);
