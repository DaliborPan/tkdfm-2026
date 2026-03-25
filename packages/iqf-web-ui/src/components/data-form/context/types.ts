import { type UseFormReturn } from "react-hook-form";

import { type BaseObject } from "../../../evidence/base";
import { type FormContextType } from "../../form/context/types";
import { type UseDataSourceResult } from "../hooks/data-source";
import { type DataFormProps } from "../types";

export type DataFormMode = "NEW" | "EDIT" | "VIEW";

export type DataFormContextType<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
> = Pick<UseDataSourceResult<TData, TFieldValues>, "mutation" | "query"> &
  Pick<DataFormProps<TData, TFieldValues>, "defaultValues" | "api" | "url"> &
  Pick<Required<DataFormProps<TData, TFieldValues>>, "detailUrlMapper"> & {
    isExisting: boolean;

    // Mode
    mode: DataFormMode;
    editing: boolean;
    isEditing: boolean;
    isNew: boolean;
    setMode: (mode: DataFormMode) => void;

    readOnly: boolean;

    // Shorthand for `query.data`
    entity: TData | undefined;
  };

export type UseDataFormContextResult<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
> = DataFormContextType<TData, TFieldValues> &
  UseFormReturn<TFieldValues> &
  FormContextType<TFieldValues>;
