import { type ColumnPinningState } from "@tanstack/react-table";

import { usePreferences } from "iqf-web-ui/settings";

export function useColumnPinning({
  preferenceGroupKey,
}: {
  preferenceGroupKey: string;
}) {
  const [columnPinning, setColumnPinning] = usePreferences<ColumnPinningState>({
    preferenceGroupKey,
    preferenceKey: "columnPinning",
    defaultValue: {
      left: ["select"],
      right: ["open"],
    },
    version: 1,
  });

  return {
    columnPinning,
    setColumnPinning,
  };
}
