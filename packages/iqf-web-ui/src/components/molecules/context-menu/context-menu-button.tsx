import { Button, type ButtonProps } from "iqf-web-ui/button";
import { ContextMenuItem } from "iqf-web-ui/context-menu";

export function ContextMenuButton({ className, ...props }: ButtonProps) {
  return (
    <ContextMenuItem
      asChild={true}
      onSelect={(e) => e.preventDefault()}
      className="cursor-pointer p-0"
    >
      <Button
        size="m"
        {...props}
        variant="base"
        className="w-full justify-between p-3"
      />
    </ContextMenuItem>
  );
}
