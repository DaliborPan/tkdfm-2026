"use client";

import { useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { type BaseObject } from "iqf-web-ui/base";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams = searchParams?.toString();

  return useCallback(
    (row, event) =>
      onRowClick
        ? onRowClick(row, event)
        : router.push(
            `${url}/${row.id}${queryParams ? `?${queryParams}` : ""}`,
          ),
    [onRowClick, queryParams, router, url],
  );
}
