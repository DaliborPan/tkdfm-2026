"use client";

import { type ReactNode } from "react";

import { type PropsWithElementRef } from "../../../types";
import { type AtomMessageProps } from "../../atoms/atom-message/types";
import { Checkbox } from "../../atoms/checkbox";
import { type CheckboxProps } from "../../atoms/checkbox/types";
import {
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
} from "../../atoms/state-atom-control";
import { type StateAtomControlContextType } from "../../atoms/state-atom-control/types";

type CheckboxItem = {
  label?: ReactNode;
  message?: AtomMessageProps;
  value: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  id?: CheckboxProps["id"];
  className?: string;
  items: CheckboxItem[];
  value?: string;
  label?: string;
  message?: AtomMessageProps;
  onChange?: (value: string | null) => void;
  size?: CheckboxProps["size"];
  disabled?: boolean;

  /**
   * CheckboxGroup's state. For `FormCheckboxGroup`, state is passed via `FormControl` component.
   */
  state?: StateAtomControlContextType["state"];
};

export function CheckboxGroup({
  id,
  disabled = false,
  size = "s",
  items,
  label,
  message,
  value,
  onChange,
  state,
  ref,
}: PropsWithElementRef<CheckboxGroupProps, HTMLDivElement>) {
  return (
    <StateAtomControlProvider state={state}>
      {label && (
        <div className="mb-1">
          <StateAtomLabel size={size} htmlFor={id ?? "UNDEFINED_ID"}>
            {label}
          </StateAtomLabel>
        </div>
      )}

      <div ref={ref} className="flex flex-col gap-2" id={id}>
        {items.map((item, index) => {
          const checkboxId = `${id}-${index}`;

          return (
            <Checkbox
              {...item}
              id={checkboxId}
              state={state}
              checked={value === item.value}
              key={`checkbox-${item.value}`}
              onChange={(checked) => {
                onChange?.(checked ? item.value : null);
              }}
              size={size}
              disabled={disabled || item.disabled}
            />
          );
        })}
      </div>

      <StateAtomMessage {...message} />
    </StateAtomControlProvider>
  );
}
