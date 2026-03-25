import { type ComponentPropsWithRef, type ReactNode } from "react";

import { type AtomMessageProps } from "../atom-message/types";
import { type IconProps } from "../icon/types";
import { type StateAtomControlContextType } from "../state-atom-control/types";
import { type InputVariantsType } from "./const";

type CommonInputProps = {
  /**
   * Left icon
   */
  iconLeft?: IconProps;

  /**
   * Right icon
   */
  iconRight?: IconProps;

  /**
   * Arbitrary child component to be rendered inside input. Rendered in relative container,
   * so it can be positioned absolutely.
   */
  inputChild?: ReactNode;

  /**
   * Label for input. State is handled via `state` prop.
   */
  label?: ReactNode;

  /**
   * Message for input.
   */
  message?: Pick<AtomMessageProps, "className" | "icon" | "text">;

  /**
   * If `false`, state is set to `default`
   */
  allowDisplayState?: boolean;

  /**
   * Input's state. For `FormInput`, state is passed via `FormControl` component.
   */
  state?: StateAtomControlContextType["state"];

  /**
   * Input's size
   */
  size?: "s" | "m" | "l" | "xl";

  /**
   * If provided, a reset button inside input will be rendered. This callback
   * is called when the reset button is clicked.
   */
  onReset?: () => void;
} & Omit<InputVariantsType, "size" | "disabled" | "multiline">;

/**
 * Props for input component as `<textarea />`
 */
export type TextAreaComponentProps = CommonInputProps &
  Omit<ComponentPropsWithRef<"textarea">, "size"> & {
    multiline: true;
  };

/**
 * Props for input component as `<input />`
 */
export type InputComponentProps = CommonInputProps &
  Omit<ComponentPropsWithRef<"input">, "size"> & {
    multiline?: false;
  };

/**
 * Discriminated union type for Input component
 */
export type InputProps = TextAreaComponentProps | InputComponentProps;
