import { useMemo } from "react";
import {
  type NumberFormatValues,
  NumericFormat,
  type SourceInfo,
  numericFormatter,
} from "react-number-format";

import { useEventCallback } from "../../../utils/hooks/event-callback-hook";
import { Input, type InputComponentProps } from "../input";

export type DecimalProps = Omit<InputComponentProps, "value" | "onChange"> & {
  value?: string;
  allowNegative?: boolean;
  maxValue?: number;
  minValue?: number;
  decimalScale?: number;
  thousandSeparator?: string | boolean;
  fixedDecimalDigits?: boolean;
  onChange?: (value: string) => void;
};

function formatToBoundaries(
  value: string,
  minValue?: number,
  maxValue?: number,
) {
  let boundaryValue = value;

  if (minValue !== undefined && parseFloat(value) < minValue) {
    boundaryValue = minValue.toString();
  }

  if (maxValue !== undefined && parseFloat(value) > maxValue) {
    boundaryValue = maxValue.toString();
  }

  return boundaryValue;
}

export function Decimal({
  value,
  maxValue,
  minValue,
  allowNegative = false,
  decimalScale = 2,
  thousandSeparator = " ",
  fixedDecimalDigits = false,
  onFocus,
  ref,
  ...inputProps
}: DecimalProps) {
  const formattedValue = numericFormatter(String(value ?? ""), {
    decimalScale,
    thousandSeparator,
    allowNegative,
    allowLeadingZeros: false,
    fixedDecimalScale: fixedDecimalDigits,
  });

  const onChange = useEventCallback(
    (values: NumberFormatValues, info: SourceInfo) => {
      if (info.source === "event") {
        inputProps.onChange?.(values.value);
      }
    },
  );

  const CustomInput = useMemo(
    () => {
      function Component({
        value,
        onChange,
        onFocus,
        onBlur,
        getInputRef,
      }: {
        value: string;
        onChange: DecimalProps["onChange"];
        onFocus?: DecimalProps["onFocus"];
        onBlur?: DecimalProps["onBlur"];
        getInputRef?: (ref: HTMLInputElement | null) => void;
      }) {
        return (
          <Input
            {...inputProps}
            ref={getInputRef}
            type="text"
            value={value}
            // Magic. Throws error if `onChange?.(e.target.value)` is used.
            onChange={(e) => onChange?.(e as any)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        );
      }
      Component.displayName = "CustomInput";
      return Component;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      inputProps.message,
      inputProps.disabled,
      inputProps.invalid,
      inputProps.readOnly,
    ],
  );

  return (
    <NumericFormat
      customInput={CustomInput}
      decimalScale={decimalScale}
      allowNegative={allowNegative}
      allowLeadingZeros={false}
      thousandSeparator={thousandSeparator}
      fixedDecimalScale={fixedDecimalDigits}
      isAllowed={(values) => {
        const boundaryValue = formatToBoundaries(
          values.value,
          minValue,
          maxValue,
        );

        if (values.value === boundaryValue) {
          return true;
        } else {
          inputProps.onChange?.(boundaryValue);

          return false;
        }
      }}
      getInputRef={ref}
      value={formattedValue}
      onValueChange={onChange}
      onFocus={onFocus}
    />
  );
}
