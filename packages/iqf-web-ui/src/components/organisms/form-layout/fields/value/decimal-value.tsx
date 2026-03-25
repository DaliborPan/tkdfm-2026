import { numericFormatter } from "react-number-format";

import { TextValue } from "./text-value";

export type DecimalValueProps = {
  value?: number;
  className?: string;

  allowNegative?: boolean;
  decimalScale?: number;
  thousandSeparator?: string | boolean;
};

export function DecimalValue({
  value,
  className = "",
  allowNegative = false,
  decimalScale = 2,
  thousandSeparator = " ",
}: DecimalValueProps) {
  const formattedValue = numericFormatter((value || "")?.toString(), {
    decimalScale,
    thousandSeparator,
    allowNegative,
    fixedDecimalScale: false,
    allowLeadingZeros: false,
  });

  return <TextValue value={formattedValue} className={className} />;
}
