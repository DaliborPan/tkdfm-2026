import { type PropsWithChildren, type ReactNode, type RefObject } from "react";

import { type DataFormProps } from "../components/data-form/types";
import {
  type DataTableProps,
  type TableHandle,
} from "../components/data-table/types";
import { type BaseObject } from "./base";

export type EvidenceConf = {
  /**
   * Evidence ID. Must be unique.
   */
  id: string;

  /**
   * Evidence version.
   * @todo To be discussed.
   *
   * @default 1
   */
  version?: number;

  /**
   * Evidence URL.
   */
  url: string;

  /**
   * Evidence API. Used for both Evidence.Table and Evidence.Detail to
   * work with API.
   */
  api: string;
};

export type EvidenceProps<TTableData extends BaseObject = BaseObject> = {
  /**
   * Evidence configuration.
   */
  conf: EvidenceConf;

  /**
   * If `true`, readOnly is passed to DataTable and DataForm. This
   * value is also available in `useEvidenceContext`.
   *
   * @default false
   */
  readOnly?: boolean;

  /**
   * Table component. In standard situation, `<Evidence.Table />` component should be used.
   */
  table: ReactNode;

  /**
   * Detail component. In standard situation, `<Evidence.Detail />` component should be used.
   */
  detail: ReactNode;

  /**
   * If a custom `table` does not use `<Evidence.Table />`, you can provide `tableRef`, that will
   * be then available in `useEvidenceContext` hook.
   */
  tableRef?: RefObject<TableHandle<TTableData> | null>;

  /**
   * Changes default detail size.
   *
   * @default 50
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
  Omit<DataFormProps<TData, TFieldValues>, "api" | "url" | "itemId">
>;

export type CreateSimpleEvidenceRoutesParams<TPermissionType extends string> = {
  /**
   * URL, on which the evidence will be rendered.
   */
  url: string;

  /**
   * Evidence component to be rendered.
   */
  evidence: ReactNode;

  /**
   * Permission to check via `hasPermission` function. If no permission is provided,
   * this evidence will be available for all users.
   */
  permission?: TPermissionType;

  /**
   * Component to render if the user does not have the permission.
   */
  unauthorized?: ReactNode;
};

export type CreateEvidenceRoutesParams<TPermissionType extends string> =
  CreateSimpleEvidenceRoutesParams<TPermissionType> & {
    /**
     * Secondary menu to be rendered. Should use `useSidebarItems` hook to set items.
     */
    menu: ReactNode;
  };

/**
 * Type helper to get type of the ID
 *
 * @example
 * const articleConf = {
 *   regular: {
 *     id: "REGULAR_ARTICLE",
 *     url: "...",
 *     api: "...",
 *   },
 *
 *   "life-situation": {
 *     id: "LIFE_SITUATION_ARTICLE",
 *     url: "...",
 *     api: "...",
 *   },
 *
 *   subsidy: {
 *     id: "SUBSIDY_ARTICLE",
 *     url: "...",
 * };
 *
 * type ArticleConfIdType = EvidenceConfIdType<typeof articleConf>; // "REGULAR_ARTICLE" | "LIFE_SITUATION_ARTICLE" | "SUBSIDY_ARTICLE"
 */
export type EvidenceConfIdType<TConfs extends Record<string, EvidenceConf>> =
  TConfs[keyof TConfs]["id"];
