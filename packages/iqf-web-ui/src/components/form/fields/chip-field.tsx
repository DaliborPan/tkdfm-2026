import { ChipValue } from "../values/chip-value";
import { TextField, type TextFieldProps } from "./text-field";
import { type RenderValueFn } from "./types";

export type ChipFieldProps = TextFieldProps & {
  href?: string;
};

export function ChipField({ href, renderValue, ...props }: ChipFieldProps) {
  const defaultRenderValue: RenderValueFn = (value) => (
    <ChipValue value={value} href={href} />
  );

  return (
    <TextField
      {...props}
      renderValue={(value) =>
        renderValue
          ? renderValue(value, defaultRenderValue)
          : defaultRenderValue(value)
      }
    />
  );
}
