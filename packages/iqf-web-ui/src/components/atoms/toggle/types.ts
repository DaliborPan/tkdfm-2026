import { type ReactNode } from "react";

export type ToggleProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  size?: "xs" | "s" | "m";
  label?: ReactNode;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
};
