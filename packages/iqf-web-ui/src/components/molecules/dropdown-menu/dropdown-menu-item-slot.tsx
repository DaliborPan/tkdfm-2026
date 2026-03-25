import { Slot } from "@radix-ui/react-slot";

/**
 * Focuses the element on mouse enter without scrolling it into view
 */
export const preventScrollOnMouseEnter: React.MouseEventHandler<HTMLElement> = (
  event,
) => {
  event.currentTarget.focus({ preventScroll: true });
};

export function DropdownMenuItemSlot({
  children,
  onMouseEnter,
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot> & {
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <Slot
      {...props}
      onMouseEnter={(e) => {
        preventScrollOnMouseEnter(e);

        onMouseEnter?.(e);
      }}
    >
      {children}
    </Slot>
  );
}
