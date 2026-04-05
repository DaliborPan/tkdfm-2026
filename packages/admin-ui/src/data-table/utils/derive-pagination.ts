import { type TableState } from "@tanstack/react-table";

import { type ApiPagination } from "../types";

export function derivePagination({
  pageIndex,
  pageSize,
}: TableState["pagination"]): ApiPagination {
  return {
    take: pageSize,
    skip: pageIndex * pageSize,
  };
}
