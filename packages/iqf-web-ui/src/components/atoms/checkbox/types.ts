import { type ComponentPropsWithRef, type ReactNode } from "react";

import { type AtomMessageProps } from "../atom-message/types";
import { type StateAtomControlContextType } from "../state-atom-control/types";

export type CheckboxProps = Omit<
  ComponentPropsWithRef<"input">,
  "size" | "defaultChecked" | "onChange" | "type" | "role" | "value"
> & {
  label?: ReactNode;
  labelClassName?: string;
  message?: AtomMessageProps;

  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl";

  /**
   * Callback fired when the checked state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Checkbox's state
   */
  state?: StateAtomControlContextType["state"];
};
