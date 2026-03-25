import { type ColumnPinningState } from "@tanstack/react-table";

import {
  type PreferenceProps,
  usePreferences,
} from "../../../../settings/preferences/preferences";

export function useColumnPinning({
  preferenceGroupKey,
  version,
}: PreferenceProps) {
  const [columnPinning, setColumnPinning] = usePreferences<ColumnPinningState>({
    preferenceGroupKey,
    version,
    preferenceKey: "columnPinning",
    defaultValue: {
      left: ["select"],
      right: ["open"],
    },
  });

  return {
    columnPinning,
    setColumnPinning,
  };
}
