import {
  DependencyList,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

/** `useState` with promises as a default value
 *
 * @param defaultState promise with a default value
 * @param deps hook dependencies
 */
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

/** `useMemo` fro promises
 *
 * @param getPromise a function that returns a promise with a value to memoize
 * @param deps hook dependencies
 */
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
