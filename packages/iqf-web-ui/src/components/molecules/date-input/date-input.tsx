import { Input } from "../../atoms/input";
import { type DateInputProps } from "./types";

export function DateInput({
  type = "datetime-local",
  onChange,
  value,
  ...props
}: DateInputProps) {
  return (
    <Input
      {...props}
      type={type}
      max={type === "date" ? "9999-12-31" : "9999-12-31T23:59"}
      onInput={(e) => {
        /**
         * `e.currentTarget.value` is always a string. If input is invalid
         * or empty, `e.currentTarget.value` is an empty string.
         */
        return onChange?.(e.currentTarget.value || null);
      }}
      value={value}
    />
  );
}
