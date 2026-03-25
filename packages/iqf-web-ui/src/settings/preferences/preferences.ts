import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { useSettingsContext } from "../context";

export type PreferenceProps = {
  preferenceGroupKey: string;
  version: number;
};

export function usePreferences<T>({
  preferenceGroupKey,
  version,
  preferenceKey,
  defaultValue,
}: {
  preferenceGroupKey: string;
  version: number;
  preferenceKey: string;
  defaultValue: T;
}) {
  const { preferences } = useSettingsContext();

  const oldPreference = preferences.get({ key: preferenceGroupKey, version })?.[
    preferenceKey
  ] as T;

  const [preferenceValue, setPreferenceValue] = useState<T>(
    oldPreference || defaultValue,
  );

  const newPreference = useDebounce(preferenceValue, 500);

  useEffect(() => {
    setPreferenceValue(oldPreference ?? defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferenceGroupKey]);

  useSyncPreferences({
    condition: () => {
      const key1 = JSON.stringify(oldPreference);
      const key2 = JSON.stringify(newPreference);

      return (
        (key1 !== key2 && key2 !== JSON.stringify(defaultValue)) ||
        (!!key1 && key1 !== key2 && key1 !== JSON.stringify(defaultValue))
      );
    },
    deps: [newPreference],
    preferenceKey,
    preferenceValue: () => newPreference,
    preferenceGroupKey,
    version,
  });

  return [preferenceValue, setPreferenceValue] as const;
}

export function useSyncPreferences({
  condition,
  deps,
  preferenceGroupKey,
  version,
  preferenceKey,
  preferenceValue,
}: {
  condition: () => boolean;
  deps: React.DependencyList;
  preferenceKey: string;
  preferenceValue: () => any;
} & PreferenceProps) {
  const { preferences } = useSettingsContext();

  useEffect(() => {
    const syncPreferences = async () => {
      await preferences.set({
        key: preferenceGroupKey,
        preferences: {
          version,
          [preferenceKey]: preferenceValue(),
        },
      });

      await preferences.refresh();
    };

    if (condition()) {
      syncPreferences();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
