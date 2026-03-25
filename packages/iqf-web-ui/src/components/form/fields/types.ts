import { type ReactNode } from "react";

export type RenderValueFn<TValueType = any> = (
  value: TValueType | undefined | null,
  defaultRenderValue?: RenderValueFn<TValueType>,
) => ReactNode;

export type CommonFieldProps<TValueType> = {
  readOnly?: boolean;
  valueClassName?: string;

  renderValue?: (
    value: TValueType | undefined | null,
    defaultRenderValue: RenderValueFn<TValueType>,
  ) => ReactNode;
};
