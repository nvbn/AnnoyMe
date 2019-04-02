import { createStackNavigator, createAppContainer } from "react-navigation";
import * as routes from "../routes";
import IndexScreen from "./IndexScreen";
import SettingsScreen from "./SettingsScreen";

const Navigator = createStackNavigator(
  {
    [routes.index]: IndexScreen,
    [routes.settings]: SettingsScreen,
  },
  {
    initialRouteName: routes.index,
  },
);

export default createAppContainer(Navigator);
