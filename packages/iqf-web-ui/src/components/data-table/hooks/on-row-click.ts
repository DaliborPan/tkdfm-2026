import { useCallback } from "react";

import { type BaseObject } from "../../../evidence/base";
import { useSettingsContext } from "../../../settings/context";
import { type OnRowClickFn } from "../types";

/**
 * Default onRowClick is to navigate to the row detail page.
 * `onRowClick` must be wrapped inside useCallback since it's
 * being passed as a prop to memoized component.
 */
export function useOnRowClick<TTableData extends BaseObject>({
  onRowClick,
  url,
}: {
  onRowClick?: OnRowClickFn<TTableData>;
  url: string;
}): OnRowClickFn<TTableData> {
  const { router } = useSettingsContext();

  const queryParams = router.searchParams?.toString();

  return useCallback(
    (row, event) =>
      onRowClick
        ? onRowClick(row, event)
        : router.navigate(
            `${url}/${row.id}${queryParams ? `?${queryParams}` : ""}`,
          ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onRowClick, queryParams, router],
  );
}
