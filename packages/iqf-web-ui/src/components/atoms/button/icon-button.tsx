import { cn } from "../../../utils/cn";
import { Button } from "./button";
import { type ButtonProps } from "./types";

export function IconButton({ className, ...props }: ButtonProps) {
  return <Button {...props} variant="base" className={cn("px-2", className)} />;
}
