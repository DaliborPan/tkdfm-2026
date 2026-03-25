import { type ColumnSizingState } from "@tanstack/react-table";

import {
  type PreferenceProps,
  usePreferences,
} from "../../../../settings/preferences/preferences";

const PREFERENCE_KEY = "columnSizing";

export function useColumnSizing({
  preferenceGroupKey,
  version,
}: PreferenceProps) {
  const [columnSizing, setColumnSizing] = usePreferences<ColumnSizingState>({
    preferenceGroupKey,
    version,
    preferenceKey: PREFERENCE_KEY,
    defaultValue: {},
  });

  return {
    columnSizing,
    setColumnSizing,
  };
}
