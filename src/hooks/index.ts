import {
  useEffect,
  useState,
  DependencyList,
  Dispatch,
  SetStateAction,
} from "react";

/** `useState` with promises as default value */
export const useAsyncState = <T>(
  defaultState: Promise<T>,
  deps?: DependencyList,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const [state, setState] = useState<T>();
  useEffect(() => {
    defaultState.then(setState);
  }, deps);

  return [state, setState];
};

/** `useMemo` with promises */
export const useAsyncMemo = <T>(
  getPromise: () => Promise<T>,
  deps?: DependencyList,
): T | undefined => {
  const [state, setState] = useState<T>();
  useEffect(() => {
    getPromise().then(setState);
  }, deps);

  return state;
};
