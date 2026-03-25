import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ComponentRef } from "react";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { type TooltipProps } from "./types";

export function Tooltip({
  Trigger,
  Content,
  showArrow,
  position,
  className,
  disableHoverableContent = true,
  ref,
}: PropsWithElementRef<
  TooltipProps,
  ComponentRef<typeof TooltipPrimitive.Content>
>) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={0}
      skipDelayDuration={0}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild={true} className="relative">
          {Trigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={cn(
              "z-[999] rounded-[3px] bg-primary-300 px-4 py-3 text-sm shadow-md data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 [&_svg]:fill-primary-300",
              className,
            )}
            side={position}
            ref={ref}
            sideOffset={5}
          >
            {showArrow && <TooltipPrimitive.Arrow height={10} width={20} />}
            {Content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
