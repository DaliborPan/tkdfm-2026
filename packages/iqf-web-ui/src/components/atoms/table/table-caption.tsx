import { cva } from "class-variance-authority";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

const tableCaptionVariants = cva(["text-secondary-700 mt-4 text-sm"]);

export function TableCaption({
  className,
  ...props
}: PropsWithElementRef<
  React.HTMLAttributes<HTMLTableCaptionElement>,
  HTMLTableCaptionElement
>) {
  return (
    <caption className={cn(tableCaptionVariants({ className }))} {...props} />
  );
}
