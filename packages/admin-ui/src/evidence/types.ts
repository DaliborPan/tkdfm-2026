import { type PropsWithChildren } from "react";

import { type BaseObject } from "iqf-web-ui/base";
import { type DataFormProps } from "iqf-web-ui/data-form";

import {
  type ApiFilter,
  type DataTableProps,
  type TableHandle,
} from "../data-table";

export type EvidenceConf = {
  /**
   * Evidence ID.
   */
  name: string;

  /**
   * Evidence version.
   *
   * @todo To be discussed.
   */
  version?: number;

  /**
   * Evidence URL. Used for correct navigation.
   */
  url: string;

  /**
   * Evidence API. Used for both Evidence.Table and Evidence.Detail to
   * work with API.
   */
  api: string;

  /**
   * @todo docs
   */
  writePermission?: string[];

  /**
   * @todo docs
   */
  readPermission?: string[];

  /**
   * Prefilters for DataTable for particular evidenceName
   */
  preFilters?: ApiFilter[];
};

export type EvidenceProps<TTableData extends BaseObject = BaseObject> = {
  /**
   * Evidence configuration.
   */
  conf: EvidenceConf;

  /**
   * If `true`, add button is not shown and form is read-only.
   */
  readOnly?: boolean;

  /**
   * Table component. In standard situation, `<Evidence.Table />` component should be used.
   */
  table: React.ReactNode;

  /**
   * Detail component. In standard situation, `<Evidence.Detail />` component should be used.
   */
  detail: React.ReactNode;

  /**
   * If a custom `table` does not use `<Evidence.Table />`, you can provide `tableRef`, that will
   * be then available in `useEvidenceContext` hook.
   */
  tableRef?: React.RefObject<TableHandle<TTableData>>;

  /**
   * Changes default detail size.
   */
  defaultDetailSize?: number;
};

export type EvidenceTableProps<TTableData extends BaseObject, TValue> = Omit<
  DataTableProps<TTableData, TValue>,
  "schema" | "id" | "version" | "api" | "url"
> & {
  tableSchema: DataTableProps<TTableData, TValue>["schema"];
};

export type EvidenceDetailProps<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
> = PropsWithChildren<
  Pick<
    DataFormProps<TData, TFieldValues>,
    | "formSchema"
    | "detailSchema"
    | "defaultValues"
    | "readOnly"
    | "toolbar"
    | "onMutationSuccess"
    | "fetchData"
    | "titleMapper"
    | "detailUrlMapper"
    | "header"
    | "mutation"
  >
>;
