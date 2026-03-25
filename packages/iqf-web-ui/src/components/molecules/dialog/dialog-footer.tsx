import { cva } from "class-variance-authority";

import { cn } from "../../../utils/cn";
import { useDialogContentContext } from "./context";

const dialogFooterVariants = cva(
  ["flex flex-row justify-center gap-x-2 border-t py-4 pr-6 sm:justify-end"],
  {
    variants: {
      size: {
        s: "pr-5",
        m: "",
        l: "",
        xl: "",
        "2xl": "",
      },
    },
  },
);

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = useDialogContentContext();

  return (
    <div className={cn(dialogFooterVariants({ size }), className)} {...props} />
  );
}
