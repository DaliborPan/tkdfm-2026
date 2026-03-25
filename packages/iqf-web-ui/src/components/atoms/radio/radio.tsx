import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import {
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
  useStateAtomControlContext,
} from "../state-atom-control";
import { radioIconVariants, radioLabelVariants, radioVariants } from "./const";
import { type RadioProps } from "./types";

const labelSizeMap: Record<
  NonNullable<RadioProps<BaseObject>["size"]>,
  "xs" | "s" | "m"
> = {
  xxs: "xs",
  xs: "s",
  s: "s",
  m: "s",
  l: "m",
  xl: "m",
};

function InternalRadio<T extends BaseObject>({
  id,
  className,
  size = "s",
  checked,
  disabled,
  value,
  onChange,
  ...props
}: RadioProps<T>) {
  const { invalid } = useStateAtomControlContext();

  return (
    <>
      <input
        id={id}
        type="radio"
        checked={checked}
        disabled={disabled}
        className={cn(
          "peer absolute inset-0 cursor-pointer opacity-0",
          disabled && "cursor-not-allowed",
        )}
        value={typeof value === "object" ? value.id : String(value)}
        onChange={(e) => {
          onChange?.(value, e);
        }}
        {...props}
      />

      <div
        className={cn(
          radioVariants({ size, checked, disabled, invalid }),
          "peer-focus-visible:ring-2 peer-focus-visible:ring-black",
        )}
      >
        <div
          className={cn(radioIconVariants({ checked, disabled, invalid }))}
        />
      </div>
    </>
  );
}

export function Radio<T extends BaseObject>({
  id,
  label,
  labelClassName,
  message,
  state,
  className,
  size = "s",
  checked,
  details,
  required,
  ...props
}: RadioProps<T>) {
  return (
    <StateAtomControlProvider state={state}>
      <div className={cn("group relative flex gap-3", className)}>
        <InternalRadio id={id} size={size} checked={checked} {...props} />

        {label && (
          <StateAtomLabel
            required={required}
            size={labelSizeMap[size]}
            htmlFor={id ?? "UNDEFINED_ID"}
            aria-label={props["aria-label"]}
            className={cn(radioLabelVariants({ size }), labelClassName)}
          >
            {label}
          </StateAtomLabel>
        )}
      </div>

      <StateAtomMessage {...message} />

      {checked && details}
    </StateAtomControlProvider>
  );
}
