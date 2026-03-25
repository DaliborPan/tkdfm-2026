import {
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";

import { type BaseObject } from "../../../evidence/base";
import { type AtomMessageProps } from "../atom-message";
import { type StateAtomControlContextType } from "../state-atom-control";

/**
 * Radio can hold either object extending BaseObject, boolean or string.
 */
export type RadioValue<T extends BaseObject> = string | boolean | T;

export type RadioContent<T extends BaseObject> = {
  id?: string;
  label?: string;
  labelClassName?: string;
  message?: AtomMessageProps;

  /**
   * Radio's state.
   */
  state?: StateAtomControlContextType["state"];

  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl";

  details?: ReactNode;

  value: RadioValue<T>;

  onChange?: (
    value: RadioValue<T>,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
};

export type RadioProps<T extends BaseObject> = Omit<
  ComponentPropsWithRef<"input">,
  "size" | "defaultChecked" | "value" | "onChange"
> &
  RadioContent<T>;
