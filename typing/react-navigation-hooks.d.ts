declare module "react-navigation-hooks" {
  import { NavigationScreenProp, NavigationRoute } from "react-navigation";

  function useNavigation<S>(): NavigationScreenProp<S & NavigationRoute>;
}
