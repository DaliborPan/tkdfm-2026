import { type Table } from "@tanstack/react-table";

import { type BaseObject } from "iqf-web-ui/base";

import { type DataTableProps } from "../../types";
import { type UseDataSourceResult } from "../data-source";
import { type UseDataTableStateResult } from "../data-table-state";

export type UseReactTableParams<TTableData extends BaseObject, TValue> = Pick<
  DataTableProps<TTableData, TValue>,
  "columns"
> & {
  state: Pick<
    UseDataTableStateResult<TTableData>,
    "initialState" | "state" | "stateHandlers"
  >;
  pageCount: UseDataSourceResult<TTableData>["pageCount"];

  // Comming from the data source
  data: TTableData[];

  serverSide: boolean;
};

export type UseReactTableResult<TTableData extends BaseObject> =
  Table<TTableData>;
