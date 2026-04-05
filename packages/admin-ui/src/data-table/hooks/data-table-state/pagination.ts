import { type PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export function usePagination({
  defaultPagination,
}: {
  defaultPagination: PaginationState;
}) {
  const [{ pageIndex, pageSize }, setPagination] =
    useState<PaginationState>(defaultPagination);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  return {
    pagination,
    setPagination,
  };
}
