import { Popover, type PopoverProps } from "../../../atoms/popover";

export function ComboboxPopover({
  triggerRef,
  maxHeight,
  ...props
}: Omit<
  PopoverProps,
  | "position"
  | "onOpenAutoFocus"
  | "onCloseAutoFocus"
  | "className"
  | "trigger"
  | "Trigger"
  | "content"
  | "Content"
> &
  Pick<
    Required<PopoverProps>,
    "trigger" | "content" | "open" | "onOpenChange"
  > & {
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    maxHeight: number;
  }) {
  /**
   * Calculates distance from bottom of the trigger
   * to determine if the popover should be displayed
   * on top or bottom.
   *
   * @returns Distance from bottom of the trigger
   */
  const calculateDistanceFromBottom = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    const viewportHeight =
      typeof window !== "undefined" ? window.innerHeight : 0;

    return rect ? viewportHeight - rect.bottom : 0;
  };

  return (
    <Popover
      {...props}
      position={calculateDistanceFromBottom() < maxHeight ? "top" : "bottom"}
      className="border bg-white p-0"
      onOpenAutoFocus={true}
      onCloseAutoFocus={true}
    />
  );
}
