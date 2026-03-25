import { type ComponentPropsWithRef, type PropsWithChildren } from "react";

import { type IconProps } from "../icon/types";
import { type TooltipProps } from "../tooltip/types";
import { type ChipVariantsType } from "./const";

export type InnerComponentProps = PropsWithChildren<{
  iconLeft?: IconProps;
  iconRight?: IconProps;
}>;

type CommonComponentProps = {
  className?: string;
  /**
   * @deprecated use `tabIndex` instead
   */
  focusable?: boolean;
  tooltip?: string;
  tooltipPosition?: TooltipProps["position"];
} & ChipVariantsType;

export type ButtonComponentProps = CommonComponentProps &
  InnerComponentProps &
  ComponentPropsWithRef<"button"> & {
    as?: "button" | undefined;
    href?: undefined;
  };

export type AnchorComponentProps = CommonComponentProps &
  InnerComponentProps &
  ComponentPropsWithRef<"a"> & {
    as?: "a" | undefined;
    href: string;
    disabled?: boolean;
  };

export type SpanComponentProps = CommonComponentProps &
  InnerComponentProps &
  ComponentPropsWithRef<"span"> & {
    as?: "span" | undefined;
    href?: undefined;
  };

export type ChipProps =
  | ButtonComponentProps
  | AnchorComponentProps
  | SpanComponentProps;
