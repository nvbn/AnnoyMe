import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HeaderButton } from "react-navigation-header-buttons";

export default options => (
  <HeaderButton {...options} IconComponent={Icon} iconSize={23} />
);
