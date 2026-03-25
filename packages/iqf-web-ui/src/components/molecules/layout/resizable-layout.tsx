"use client";

import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/icon";
import {
  type SeparatorVariantsType,
  handleVariants,
  iconVariants,
  separatorVariants,
} from "./const";

export function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Group>) {
  return (
    <ResizablePrimitive.Group
      className={cn(
        "relative flex h-full w-full data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

export const ResizablePanel = ResizablePrimitive.Panel;

export function ResizableSeparator({
  withHandle,
  variant = "vertical",
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> &
  SeparatorVariantsType & {
    withHandle?: boolean;
  }) {
  return (
    <ResizablePrimitive.Separator
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    >
      {withHandle && (
        <div className={handleVariants({ variant })}>
          <Icon Icon={GripVertical} className={iconVariants({ variant })} />
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}
