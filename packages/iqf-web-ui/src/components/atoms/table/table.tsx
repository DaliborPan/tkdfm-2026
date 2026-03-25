import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";

export function Table({
  className,
  wrapperClassName,
  ...props
}: PropsWithElementRef<
  React.HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  wrapperClassName?: string;
}) {
  return (
    /**
     * Wrapping element is needed here to make the table scrollable
     */
    <div className={cn("min-w-full grow overflow-auto", wrapperClassName)}>
      <table className={cn("table w-full", className)} {...props} />
    </div>
  );
}
