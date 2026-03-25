import { type ComponentPropsWithRef, type PropsWithChildren } from "react";

import { type IconProps } from "../icon/types";
import { type TooltipProps } from "../tooltip/types";
import { type ButtonVariantsType } from "./const";

type CommonComponentProps = {
  tooltip?: string;
  tooltipPosition?: TooltipProps["position"];
  accessible?: boolean;
};

export type InnerComponentProps = PropsWithChildren<
  ButtonVariantsType & {
    iconLeft?: IconProps;
    iconRight?: IconProps;
    isLoading?: boolean;
  }
>;

export type ButtonElementProps = CommonComponentProps &
  InnerComponentProps &
  ComponentPropsWithRef<"button"> & {
    href?: undefined;
  };

export type AnchorElementProps = CommonComponentProps &
  InnerComponentProps &
  ComponentPropsWithRef<"a"> & {
    href: string;
    disabled?: boolean;
  };

export type ButtonProps = ButtonElementProps | AnchorElementProps;
