import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";
import { Label } from "../label";
import { labelVariants } from "../label/const";
import { useStateAtomControlContext } from "../state-atom-control/state-atom-control";

/**
 * `StateAtomLabel` must be used within `StateAtomControlProvider`.
 *
 * It gets the state from the context and applies it to the label.
 */
export function StateAtomLabel({
  required,
  children,
  size,
  disabled,
  className,
  ...props
}: Omit<ComponentPropsWithRef<typeof Label>, "state"> & {
  required?: boolean;
  disabled?: boolean;
}) {
  const { state } = useStateAtomControlContext();

  return (
    <Label
      {...props}
      state={state}
      className={cn(labelVariants({ state, size, disabled }), className)}
    >
      {children}

      {required && <span className="ml-1.5 font-thin text-neutral-400">*</span>}
    </Label>
  );
}
