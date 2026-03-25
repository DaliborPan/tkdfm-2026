import { type PropsWithChildren } from "react";

import { type BaseObject } from "../../../evidence/base";
import { useDataFormMode } from "../hooks/data-form-mode";
import { type UseDataSourceResult } from "../hooks/data-source";
import { type DataFormProps } from "../types";
import { DataFormContext } from "./data-form-context";

export function DataFormContextProvider<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({
  children,
  itemId,
  ...value
}: PropsWithChildren<
  Pick<UseDataSourceResult<TData, TFieldValues>, "mutation" | "query"> &
    Pick<DataFormProps<TData, TFieldValues>, "defaultValues" | "api" | "url"> &
    Pick<Required<DataFormProps<TData, TFieldValues>>, "detailUrlMapper"> & {
      itemId: string;
      readOnly: boolean;
    }
>) {
  const dataFormMode = useDataFormMode({ itemId });

  return (
    <DataFormContext.Provider
      value={{
        ...value,
        ...dataFormMode,

        isExisting: !dataFormMode.isNew,
        entity: value.query.data,
      }}
    >
      {children}
    </DataFormContext.Provider>
  );
}
