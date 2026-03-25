import { createContext, useContext } from "react";
import { useFormContext as useReactHookFormContext } from "react-hook-form";

import { type BaseObject } from "../../../evidence/base";
import { type FormContextType } from "../../form";
import { FormContext } from "../../form/context/form-context";
import {
  type DataFormContextType,
  type UseDataFormContextResult,
} from "./types";

export const DataFormContext = createContext<DataFormContextType<any, any>>(
  null as never,
);

export function useDataFormContext<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>(): UseDataFormContextResult<TData, TFieldValues> {
  /**
   * Intentionally hooking "safely" via useContext and RHF useReactHookFormContext to not throw an error.
   * There was an edge case where the context was not provided and the error was thrown.
   *
   * However, the most usual case is that `useDataFormContext` is used
   * within the DataFormContextProvider and FormProvider.
   *
   * There should be used `useFormContext` in the future.
   */
  const reactHookFormContext = useReactHookFormContext<TFieldValues>();
  const formContext = useContext(FormContext);

  const context =
    useContext<DataFormContextType<TData, TFieldValues>>(DataFormContext);

  if (!context) {
    throw new Error("useDataFormContext must be used within a DataFormContext");
  }

  return {
    ...(formContext as FormContextType<TFieldValues>),
    ...reactHookFormContext,
    ...context,
  };
}
