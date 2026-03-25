import { CirclePlus } from "lucide-react";

import { cn } from "../../../utils/cn";
import { Button, type ButtonElementProps } from "../../atoms/button";
import { type IconProps } from "../../atoms/icon";
import { type InputProps } from "../../atoms/input";
import {
  submitInputButtonIconVariants,
  submitInputButtonVariants,
} from "./const";

export function InputChildButton({
  Icon = CirclePlus,
  size,
  className,
  ...props
}: Omit<ButtonElementProps, "iconLeft" | "iconRight" | "size" | "variant"> & {
  Icon?: IconProps["Icon"];
  size: NonNullable<InputProps["size"]>;
}) {
  return (
    <Button
      {...props}
      size="xs"
      variant="base"
      className={cn(submitInputButtonVariants({ size }), className)}
      iconLeft={{
        Icon,
        className: submitInputButtonIconVariants({ size }),
      }}
    />
  );
}
