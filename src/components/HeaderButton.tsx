import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HeaderButton } from "react-navigation-header-buttons";

/**
 * Header button bound to material icons set and specific size.
 */
export default (options: any) => (
  <HeaderButton {...options} IconComponent={Icon} iconSize={23} />
);
