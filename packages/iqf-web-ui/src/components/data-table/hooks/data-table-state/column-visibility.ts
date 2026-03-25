import { type VisibilityState } from "@tanstack/react-table";

import {
  type PreferenceProps,
  usePreferences,
} from "../../../../settings/preferences/preferences";

export function useVisibility({
  preferenceGroupKey,
  version,
  defaultVisibility,
}: PreferenceProps & { defaultVisibility: VisibilityState }) {
  const [columnVisibility, setColumnVisibility] =
    usePreferences<VisibilityState>({
      preferenceGroupKey,
      version,
      preferenceKey: "columnVisibility",
      defaultValue: defaultVisibility,
    });

  return {
    columnVisibility,
    setColumnVisibility,
  };
}
