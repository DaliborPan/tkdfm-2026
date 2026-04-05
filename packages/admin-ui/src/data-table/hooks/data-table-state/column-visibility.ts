import { type VisibilityState } from "@tanstack/react-table";

import { usePreferences } from "iqf-web-ui/settings";

export function useVisibility({
  preferenceGroupKey,
  defaultVisibility,
}: {
  defaultVisibility: VisibilityState;
  preferenceGroupKey: string;
}) {
  const [columnVisibility, setColumnVisibility] =
    usePreferences<VisibilityState>({
      preferenceGroupKey,
      preferenceKey: "columnVisibility",
      defaultValue: defaultVisibility,
      version: 1,
    });

  return {
    columnVisibility,
    setColumnVisibility,
  };
}
