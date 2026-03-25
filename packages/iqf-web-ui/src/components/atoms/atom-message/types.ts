import type { IconProps } from "../icon/types";

export type AtomMessageProps = {
  text?: React.ReactNode;
  icon?: IconProps;
  state?: "success" | "error" | "default";
  size?: "xs" | "s" | "m" | "l" | "xl";
  className?: string;
  disabled?: boolean;
};
