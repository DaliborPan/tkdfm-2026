import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

export function TableRow({
  className,
  ...props
}: PropsWithElementRef<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>) {
  return (
    <tr
      className={cn(
        [
          "flex border-b transition-colors data-[state=selected]:bg-secondary-300",
        ],
        className,
      )}
      {...props}
    />
  );
}
