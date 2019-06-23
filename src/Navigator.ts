import { createAppContainer, createStackNavigator } from "react-navigation";
import CreateScreen from "./components/CreateScreen";
import EditScreen from "./components/EditScreen";
import ListScreen from "./components/ListScreen";
import SettingsScreen from "./components/SettingsScreen";
import * as routes from "./constants/routes";

const Navigator = createStackNavigator(
  {
    [routes.LIST]: ListScreen,
    [routes.SETTINGS]: SettingsScreen,
    [routes.CREATE]: CreateScreen,
    [routes.EDIT]: EditScreen,
  },
  {
    initialRouteName: routes.LIST,
  },
);

export default createAppContainer(Navigator);
