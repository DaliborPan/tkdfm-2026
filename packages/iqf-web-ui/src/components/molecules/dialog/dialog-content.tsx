import { Content, Overlay, Portal } from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { DialogContentContextProvider } from "./context";
import {
  type DialogContentProps,
  type DialogSize,
  type OverlayComponentType,
} from "./types";

const sizeMap: Record<DialogSize, string> = {
  s: "max-w-sm",
  m: "max-w-lg",
  l: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-6xl",
};

function DialogOverlay({
  className,
  ...props
}: ComponentPropsWithRef<typeof Overlay> & {
  as?: OverlayComponentType;
}) {
  const OverlayComponent = props.as === "Overlay" ? Overlay : "div";

  return (
    <OverlayComponent
      className={cn(
        "pointer-events-auto fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  size = "m",
  overlayAs = "div",
  ...props
}: ComponentPropsWithRef<typeof Content> & DialogContentProps) {
  return (
    <DialogContentContextProvider size={size}>
      <Portal>
        <DialogOverlay as={overlayAs} />

        <Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 flex max-h-[calc(100vh-2rem)] w-full translate-x-[-50%] translate-y-[-50%] flex-col border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[3px]",
            sizeMap[size],
            className,
          )}
          {...props}
        />
      </Portal>
    </DialogContentContextProvider>
  );
}
