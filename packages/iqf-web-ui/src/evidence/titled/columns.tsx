"use client";

import { useIntl } from "react-intl";

import { TypedColumns } from "../../components/data-table/columns";
import {
  type UseDomainColumnsParams,
  useDomainColumns,
} from "../domain/columns";
import { type TitledObject } from "./schema";

const { tableColumn } = new TypedColumns<TitledObject>();

export function useTitleColumn<TData extends TitledObject>() {
  const intl = useIntl();

  return tableColumn.text<TData>({
    name: "title",
    label: intl.formatMessage({
      id: "titled-evidence.columns.title",
      defaultMessage: "Název",
    }),

    minSize: 175,
    enableGlobalFilter: true,
  });
}

export function useDescriptionColumn<TData extends TitledObject>() {
  const intl = useIntl();

  return tableColumn.text<TData>({
    name: "description",
    label: intl.formatMessage({
      id: "titled-evidence.columns.description",
      defaultMessage: "Popis",
    }),

    minSize: 175,
    enableGlobalFilter: true,
  });
}

export type UseTitledColumnsParams = UseDomainColumnsParams & {
  title?: boolean;
  description?: boolean;
};

export function useTitledColumns<TData extends TitledObject>({
  title = true,
  description = true,

  createdAt = true,
  createdBy = true,
  modifiedAt = true,
  modifiedBy = true,
}: UseTitledColumnsParams = {}) {
  const titleColumn = useTitleColumn<TData>();
  const descriptionColumn = useDescriptionColumn<TData>();

  const domainColumns = useDomainColumns<TData>({
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
  });

  return [
    ...(title ? [titleColumn] : []),
    ...(description ? [descriptionColumn] : []),
    ...domainColumns,
  ];
}
