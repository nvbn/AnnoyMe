import { createStackNavigator, createAppContainer } from "react-navigation";
import CreateScreen from "../components/CreateScreen";
import ListScreen from "../components/ListScreen";
import SettingsScreen from "../components/SettingsScreen";
import * as routes from "./routes";

const Navigator = createStackNavigator(
  {
    [routes.LIST]: ListScreen,
    [routes.SETTINGS]: SettingsScreen,
    [routes.CREATE]: CreateScreen,
  },
  {
    initialRouteName: routes.LIST,
  },
);

export default createAppContainer(Navigator);
