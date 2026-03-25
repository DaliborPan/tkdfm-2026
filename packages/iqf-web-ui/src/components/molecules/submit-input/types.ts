import { type ButtonElementProps } from "../../atoms/button/types";
import { type IconProps } from "../../atoms/icon/types";
import {
  type InputComponentProps,
  type InputProps,
} from "../../atoms/input/types";
import { type DateInputProps } from "../date-input/types";

export type SubmitInputProps = {
  onSubmit: (value: string | undefined) => void;
  Icon?: IconProps["Icon"];
  submitButtonProps?: Omit<ButtonElementProps, "size" | "onClick">;
  clearAfterSubmit?: boolean;
} & Omit<Extract<InputProps, InputComponentProps>, "onSubmit">;

export type SubmitDateInputProps = {
  onSubmit: (value: string | undefined) => void;
  Icon?: IconProps["Icon"];
  submitButtonProps?: Omit<ButtonElementProps, "size" | "onClick">;
  clearAfterSubmit?: boolean;
} & Omit<DateInputProps, "onSubmit">;
