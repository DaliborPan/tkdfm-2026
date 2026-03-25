import { cn } from "../../../utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../molecules/dropdown-menu";
import { Button, type ButtonElementProps } from "../button";

type ToolbarDropdownProps = ButtonElementProps & {
  active?: boolean;
  items: { id: string; label: React.ReactNode; onClick: () => void }[];
};

export function ToolbarDropdown({
  active = false,
  disabled,
  items,
  ref,
  ...props
}: ToolbarDropdownProps) {
  return (
    <DropdownMenu variant="primary">
      <DropdownMenuTrigger asChild={true}>
        <Button
          {...props}
          ref={ref}
          tabIndex={-1}
          size="xs"
          inverse={!active}
          disabled={disabled}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{
          maxHeight: "var(--radix-popper-available-height)",
          overflowY: "auto",
        }}
      >
        {items.map(({ id, label, onClick }) => (
          <DropdownMenuItem
            className={cn("cursor-pointer")}
            onClick={onClick}
            key={id}
          >
            <p className="text-sm font-bold">{label}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
