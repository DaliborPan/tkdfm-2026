import { Button, type ButtonProps } from "iqf-web-ui/button";
import { cn } from "iqf-web-ui/cn";

export function DataTableCaptionButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      variant="base"
      className={cn("size-9 min-h-0", className)}
    />
  );
}
