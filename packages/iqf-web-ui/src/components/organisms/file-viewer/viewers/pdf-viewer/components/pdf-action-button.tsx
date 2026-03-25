import { cn } from "../../../../../../utils/cn";
import { Button, type ButtonElementProps } from "../../../../../atoms/button";

export function PdfActionButton({
  variant = "base",
  className,
  ...props
}: ButtonElementProps) {
  return (
    <Button
      variant={variant}
      className={cn("min-h-0 p-1", className)}
      {...props}
    />
  );
}
