import "./styles.css";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type ComponentRef } from "react";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { type PopoverProps } from "./types";

export function Popover({
  Trigger,
  trigger = Trigger,
  Content,
  content = Content,
  open,
  onOpenChange,
  showArrow,
  position,
  className,
  arrowClassName,
  sideOffsetValue = 5,
  onClose,
  modal,
  onOpenAutoFocus = false,
  onCloseAutoFocus = false,
  ref,
}: PropsWithElementRef<
  PopoverProps,
  ComponentRef<typeof PopoverPrimitive.Content>
>) {
  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <PopoverPrimitive.Trigger asChild={true}>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            "popover-content z-50 rounded-lg bg-primary-300 px-4 py-3 text-sm shadow-md data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          side={position}
          ref={ref}
          sideOffset={sideOffsetValue}
          onOpenAutoFocus={(e) => {
            if (!onOpenAutoFocus) {
              e.preventDefault();
            }
          }}
          onCloseAutoFocus={(e) => {
            if (!onCloseAutoFocus) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            if (e.type !== "dismissableLayer.pointerDownOutside") {
              e.preventDefault();
            }
          }}
          onPointerDownOutside={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          {showArrow && (
            <PopoverPrimitive.Arrow
              height={10}
              width={20}
              className={arrowClassName}
            />
          )}
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export const PopoverClose = PopoverPrimitive.Close;
