import { createStackNavigator, createAppContainer } from "react-navigation";
import * as routes from "../routes";
import IndexScreen from "./IndexScreen";
import SettingsScreen from "./SettingsScreen";
import CreateScreen from "./CreateScreen";

const Navigator = createStackNavigator(
  {
    [routes.index]: IndexScreen,
    [routes.settings]: SettingsScreen,
    [routes.create]: CreateScreen,
  },
  {
    initialRouteName: routes.index,
  },
);

export default createAppContainer(Navigator);
