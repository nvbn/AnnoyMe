import { act } from "react-test-renderer";
import Settings from "../dto/Settings";

/** Waits for useEffect effects. */
export const waitForEffects = () =>
  new Promise(resolve => setTimeout(resolve, 0));

/** Creates mock of settings repository. `resolve` should be called if settings value will be used. */
export const makeSettingsRepository = (settings?: Settings): any => {
  let resolve: (value: Settings) => void | undefined;
  const settingsPromise = new Promise(_resolve => (resolve = _resolve));

  return {
    read: jest.fn(() => settingsPromise),
    save: jest.fn((_: Settings) => undefined),

    resolve: async () => {
      act(() => resolve!(settings!));

      await waitForEffects();
    },
  };
};
