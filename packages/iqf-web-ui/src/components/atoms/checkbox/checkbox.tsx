"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "../../../utils/cn";
import { Icon } from "../icon";
import {
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
  useStateAtomControlContext,
} from "../state-atom-control";
import {
  checkboxIconVariants,
  checkboxLabelVariants,
  checkboxVariants,
} from "./const";
import { type CheckboxProps } from "./types";

const labelSizeMap: Record<
  NonNullable<CheckboxProps["size"]>,
  "xs" | "s" | "m"
> = {
  xxs: "xs",
  xs: "s",
  s: "s",
  m: "s",
  l: "m",
  xl: "m",
};

function InternalCheckbox({
  size,
  disabled,
  "aria-checked": ariaChecked,
  className,
  ref,

  ...props
}: CheckboxProps) {
  const { invalid } = useStateAtomControlContext();

  const isControlled = props.checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(false);

  const [checked, onChange] = [
    isControlled ? !!props.checked : internalChecked,
    isControlled ? props.onChange : setInternalChecked,
  ];

  return (
    <>
      <input
        {...props}
        ref={ref}
        type="checkbox"
        disabled={disabled}
        readOnly={!onChange}
        aria-checked={ariaChecked ?? checked}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className={cn(
          "peer absolute inset-0 h-full w-full cursor-pointer opacity-0",
          disabled && "cursor-default",
        )}
      />
      <div
        className={cn(
          checkboxVariants({
            size,
            checked,
            disabled,
            invalid,
          }),
          "peer-focus-visible:ring-2 peer-focus-visible:ring-black",
          className,
        )}
      >
        <Icon
          Icon={Check}
          className={checkboxIconVariants({
            size,
            checked,
          })}
        />
      </div>
    </>
  );
}

export function Checkbox({
  label,
  labelClassName,
  id,
  message,
  size = "s",
  state,
  className,
  required = false,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <StateAtomControlProvider state={state}>
      <div className={cn("group relative flex gap-3", className)}>
        <InternalCheckbox ref={ref} id={id} size={size} {...props} />

        {label && (
          <StateAtomLabel
            required={required}
            size={labelSizeMap[size]}
            htmlFor={id ?? "UNDEFINED_ID"}
            aria-label={props["aria-label"]}
            className={cn(checkboxLabelVariants({ size }), labelClassName)}
          >
            {label}
          </StateAtomLabel>
        )}
      </div>

      <StateAtomMessage {...message} />
    </StateAtomControlProvider>
  );
}
