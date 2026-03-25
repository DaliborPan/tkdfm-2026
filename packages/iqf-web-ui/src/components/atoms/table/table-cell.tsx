import { cva } from "class-variance-authority";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

const tableCellVariants = cva(
  [
    "py-2.5",
    "px-0",

    "inline-block",

    "text-sm",
    "font-normal",
    "text-left",
    "text-text-secondary",
    "align-middle",

    "antialiased",
  ],
  {
    variants: {
      isResponsive: {
        true: [
          "before:content-[attr(data-title)] before:block before:text-[0.75rem] before:uppercase before:font-bold md:before:content-[] [&>div]:!whitespace-normal [&>div]:md:!truncate",
        ],
        false: "",
      },
    },
    defaultVariants: {
      isResponsive: false,
    },
  },
);

export function TableCell({
  className,
  innerClassName,
  children,
  isResponsive = false,
  ...props
}: PropsWithElementRef<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
> & {
  isResponsive?: boolean;
  innerClassName?: string;
}) {
  return (
    <td
      className={cn(tableCellVariants({ className, isResponsive }))}
      {...props}
    >
      <div className={cn("truncate", innerClassName)}>{children}</div>
    </td>
  );
}
