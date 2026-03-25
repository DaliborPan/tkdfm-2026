import { cn } from "../../../utils/cn";
import { toggleLabelVariants, toggleVariants } from "./const";
import type { ToggleProps } from "./types";

export function Toggle({
  checked,
  onChange,
  className,
  labelClassName,
  size = "s",
  label,
  disabled = false,
}: ToggleProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        value=""
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
        disabled={disabled}
        className="peer sr-only"
      />

      <div className={cn(toggleVariants({ size }), className)} />

      {label && (
        <span className={cn(toggleLabelVariants({ size }), labelClassName)}>
          {label}
        </span>
      )}
    </label>
  );
}
