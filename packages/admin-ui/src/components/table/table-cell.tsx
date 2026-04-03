import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "iqf-web-ui/cn";

const tableCellVariants = cva(
  [
    "py-2 px-0",
    "inline-flex items-center",
    "text-sm font-normal text-left text-secondary-700 antialiased",
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

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    isResponsive?: boolean;
    innerClassName?: string;
  }
>(function TableCell(
  { className, innerClassName, children, isResponsive = false, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cn(tableCellVariants({ className, isResponsive }))}
      {...props}
    >
      <div className={cn("truncate", innerClassName)}>{children}</div>
    </td>
  );
});
