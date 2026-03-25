"use client";

import { useIntl } from "react-intl";

import { TypedColumns } from "../../components/data-table/columns";
import { type IqfColumnDef } from "../../components/data-table/columns/types";
import { type DomainObject } from "./schema";

const { tableColumn } = new TypedColumns<DomainObject>();

export function useCreatedAtColumn<TData extends DomainObject>() {
  const intl = useIntl();

  return tableColumn.instant<TData>({
    name: "createdAt",
    label: intl.formatMessage({
      id: "domain-evidence.created-at",
      defaultMessage: "Datum vytvoření",
    }),
  });
}

export function useModifiedAtColumn<TData extends DomainObject>() {
  const intl = useIntl();

  return tableColumn.instant<TData>({
    name: "modifiedAt",
    label: intl.formatMessage({
      id: "domain-evidence.modified-at",
      defaultMessage: "Datum úpravy",
    }),
  });
}

export function useCreatedByColumn<TData extends DomainObject>() {
  const intl = useIntl();

  return tableColumn.text<TData>({
    name: "createdBy.displayName",

    label: intl.formatMessage({
      id: "domain-evidence.created-by",
      defaultMessage: "Vytvořil",
    }),
    enableGlobalFilter: true,
  });
}

export function useModifiedByColumn<TData extends DomainObject>() {
  const intl = useIntl();

  return tableColumn.text<TData>({
    name: "modifiedBy.displayName",

    label: intl.formatMessage({
      id: "domain-evidence.modified-by",
      defaultMessage: "Upravil",
    }),
    enableGlobalFilter: true,
  });
}

export type UseDomainColumnsParams = {
  createdAt?: boolean;
  createdBy?: boolean;
  modifiedAt?: boolean;
  modifiedBy?: boolean;
};

export function useDomainColumns<TData extends DomainObject>({
  createdAt = true,
  createdBy = true,
  modifiedAt = true,
  modifiedBy = true,
}: UseDomainColumnsParams = {}) {
  const createdAtColumn = useCreatedAtColumn<TData>();
  const createdByColumn = useCreatedByColumn<TData>();
  const modifiedAtColumn = useModifiedAtColumn<TData>();
  const modifiedByColumn = useModifiedByColumn<TData>();

  return [
    ...(createdAt ? [createdAtColumn] : []),
    ...(createdBy ? [createdByColumn] : []),
    ...(modifiedAt ? [modifiedAtColumn] : []),
    ...(modifiedBy ? [modifiedByColumn] : []),
  ] as IqfColumnDef<TData>[];
}
