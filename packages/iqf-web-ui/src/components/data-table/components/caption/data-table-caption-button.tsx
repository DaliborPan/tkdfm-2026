import { cn } from "../../../../utils/cn";
import { Button } from "../../../atoms/button";
import { type ButtonProps } from "../../../atoms/button/types";

export function DataTableCaptionButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      variant="base"
      className={cn("size-9 min-h-0", className)}
    />
  );
}
