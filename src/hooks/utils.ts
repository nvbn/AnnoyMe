import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  DependencyList,
} from "react";
import { every } from "lodash";

/** `useState` with promise as default value */
export const useAsyncState = <T>(
  statePromise: Promise<T>,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [state, setState] = useState<T>();
  useEffect(() => {
    statePromise.then(setState);
  }, []);

  return [state, setState];
};

/** `finally`-like effect for "ready" dependencies */
export const useFinalEffect = (effect: () => void, deps?: DependencyList) =>
  useEffect(
    () => () => {
      if (!deps || every(deps, dep => dep !== null && dep !== undefined)) {
        effect();
      }
    },
    deps,
  );
