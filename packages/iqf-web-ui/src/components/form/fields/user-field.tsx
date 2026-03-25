import { UserValue } from "../values/user-value";
import { TextField, type TextFieldProps } from "./text-field";
import { type RenderValueFn } from "./types";

export type UserFieldProps = TextFieldProps & {
  multiple?: boolean;
};

export function UserField({
  multiple = false,
  renderValue,
  ...props
}: UserFieldProps) {
  const defaultRenderValue: RenderValueFn = (value) => (
    <UserValue value={value} multiple={multiple} />
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
