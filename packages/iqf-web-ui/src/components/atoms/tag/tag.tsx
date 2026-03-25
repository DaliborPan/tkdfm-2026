"use client";

import { type PropsWithChildren } from "react";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon";
import { type IconProps } from "../icon/types";
import { type TagVariantsType, tagVariants } from "./const";

export type TagProps = PropsWithChildren<TagVariantsType> & {
  className?: string;

  iconLeft?: IconProps;
  iconRight?: IconProps;
};

export function Tag({
  iconLeft,
  iconRight,
  className,
  children,
  variant = "primary",
  size = "s",
  inverse = false,
  ref,
}: PropsWithElementRef<TagProps, HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className={cn(tagVariants({ variant, size, inverse }), className)}
    >
      {iconLeft && <Icon {...iconLeft} />}
      {children}
      {iconRight && <Icon {...iconRight} />}
    </div>
  );
}
