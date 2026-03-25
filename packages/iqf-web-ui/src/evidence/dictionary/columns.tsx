"use client";

import { File } from "lucide-react";
import { useIntl } from "react-intl";

import { TypedColumns } from "../../components/data-table/columns";
import { type IqfColumnDef } from "../../components/data-table/columns/types";
import { type UseTitledColumnsParams, useTitledColumns } from "../titled";
import { type DictionaryObject } from "./schema";

const { tableColumn } = new TypedColumns<DictionaryObject>();

export function useCodeColumn<TData extends DictionaryObject>() {
  const intl = useIntl();

  return tableColumn.text<TData>({
    name: "code",
    label: intl.formatMessage({
      id: "dictionary-evidence.code",
      defaultMessage: "Kód",
    }),

    Icon: File,
    minSize: 100,
    enableGlobalFilter: true,
  });
}

export function useValidFromColumn<TData extends DictionaryObject>() {
  const intl = useIntl();

  return tableColumn.datetime<TData>({
    name: "validFrom",
    label: intl.formatMessage({
      id: "dictionary-evidence.valid-from",
      defaultMessage: "Platnost od",
    }),
  });
}

export function useValidToColumn<TData extends DictionaryObject>() {
  const intl = useIntl();

  return tableColumn.datetime<TData>({
    name: "validTo",
    label: intl.formatMessage({
      id: "dictionary-evidence.valid-to",
      defaultMessage: "Platnost do",
    }),
  });
}

export type UseDictionaryColumnsParams = UseTitledColumnsParams & {
  code?: boolean;
  validFrom?: boolean;
  validTo?: boolean;
};

export function useDictionaryColumns<TData extends DictionaryObject>({
  code = true,
  validFrom = true,
  validTo = true,

  title = true,
  description = true,

  createdAt = true,
  createdBy = true,
  modifiedAt = true,
  modifiedBy = true,
}: UseDictionaryColumnsParams = {}) {
  const codeColumn = useCodeColumn<TData>();
  const validFromColumn = useValidFromColumn<TData>();
  const validToColumn = useValidToColumn<TData>();

  const titledColumns = useTitledColumns({
    title,
    description,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
  });

  return [
    ...titledColumns,
    ...(code ? [codeColumn] : []),
    ...(validFrom ? [validFromColumn] : []),
    ...(validTo ? [validToColumn] : []),
  ] as IqfColumnDef<TData>[];
}
