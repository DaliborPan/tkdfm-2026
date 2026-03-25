import { type ReactNode } from "react";

import { cn } from "../../../../utils";
import { type AtomMessageProps } from "../../../atoms/atom-message";
import { Button, type ButtonElementProps } from "../../../atoms/button";
import {
  type StateAtomControlContextType,
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
} from "../../../atoms/state-atom-control";
import { comboboxVariants } from "../const";

export type ComboboxButtonProps = Omit<ButtonElementProps, "value"> & {
  allowDisplayState?: boolean;
  label?: ReactNode;
  message?: AtomMessageProps;
  required?: boolean;
  state?: StateAtomControlContextType["state"];
  wrapperClassName?: string;
  readOnly?: boolean;
  multiple?: boolean;
};

export function ComboboxButton({
  allowDisplayState = true,
  label,
  message,
  required,
  state,
  children,
  wrapperClassName,
  size,
  disabled,
  className,
  readOnly = false,
  onClick,
  multiple,
  ...props
}: ComboboxButtonProps) {
  const invalid = state === "error";

  return (
    <StateAtomControlProvider state={!allowDisplayState ? "default" : state}>
      <div className={cn("flex w-full flex-col", wrapperClassName)}>
        {label && (
          <div className="mb-1">
            <StateAtomLabel
              required={required}
              size={size ?? undefined}
              htmlFor={props.id ?? "UNDEFINED_ID"}
            >
              {label}
            </StateAtomLabel>
          </div>
        )}

        <Button
          {...props}
          disabled={disabled}
          aria-readonly={readOnly}
          onClick={(e) => {
            if (readOnly) {
              e.preventDefault();
              return;
            }

            onClick?.(e);
          }}
          className={cn(
            comboboxVariants({ size, disabled, multiple }),
            invalid && "border-error-600",
            className,
          )}
        >
          {children}
        </Button>

        <StateAtomMessage {...message} />
      </div>
    </StateAtomControlProvider>
  );
}
