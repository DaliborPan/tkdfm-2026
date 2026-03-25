import { Title } from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { useDialogContentContext } from "./context";

const dialogTitleVariants = cva(["px-8 py-[18px] text-2xl"], {
  variants: {
    size: {
      s: "text-xl px-6 py-4",
      m: "text-xl px-6 py-4",
      l: "",
      xl: "",
      "2xl": "",
    },
  },
});

export function DialogTitle({
  className,
  ...props
}: ComponentPropsWithRef<typeof Title>) {
  const { size } = useDialogContentContext();

  return (
    <Title
      className={cn(dialogTitleVariants({ size }), className)}
      {...props}
    />
  );
}
