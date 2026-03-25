import { cn } from "../../../utils/cn";

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("border-b text-center sm:text-left", className)}
    />
  );
}
