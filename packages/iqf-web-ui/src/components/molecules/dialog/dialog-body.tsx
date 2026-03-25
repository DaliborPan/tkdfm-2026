import { cva } from "class-variance-authority";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { useDialogContentContext } from "./context";

const dialogBodyVariants = cva(["px-8 py-6 overflow-y-auto"], {
  variants: {
    size: {
      s: "px-6 py-4",
      m: "px-6 py-4",
      l: "",
      xl: "",
      "2xl": "",
    },
  },
});

export function DialogBody({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  const { size } = useDialogContentContext();

  return (
    <div {...props} className={cn(dialogBodyVariants({ size }), className)} />
  );
}
