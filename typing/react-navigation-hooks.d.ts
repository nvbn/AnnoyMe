declare module "react-navigation-hooks" {
  import {
    NavigationScreenProp,
    NavigationRoute,
    NavigationParams,
  } from "react-navigation";

  function useNavigation<S>(): NavigationScreenProp<S & NavigationRoute>;

  function useNavigationParam<T extends keyof NavigationParams, P>(key: T): P;
}
