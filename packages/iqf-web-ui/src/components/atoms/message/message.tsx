"use client";

import { type PropsWithChildren } from "react";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon";
import { type IconProps } from "../icon/types";
import { type MessageVariantsType, messageVariants } from "./const";

export type MessageProps = PropsWithChildren<
  MessageVariantsType & {
    icon?: IconProps;
    className?: string;
  }
>;

export function Message({
  children,
  icon,
  className,
  inverse = false,
  variant = "primary",
  ref,
}: PropsWithElementRef<MessageProps, HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className={cn(messageVariants({ variant, inverse }), className)}
      role="alert"
    >
      {icon && <Icon {...icon} />}
      {children}
    </div>
  );
}
