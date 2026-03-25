"use client";

import isEqual from "lodash/isEqual";
import { type ReactNode } from "react";

import { type BaseObject } from "../../../evidence/base";
import { type PropsWithElementRef } from "../../../types";
import { type AtomMessageProps } from "../../atoms/atom-message/types";
import { Radio } from "../../atoms/radio";
import { type RadioContent, type RadioProps } from "../../atoms/radio/types";
import {
  StateAtomControlProvider,
  StateAtomLabel,
  StateAtomMessage,
} from "../../atoms/state-atom-control";
import { type StateAtomControlContextType } from "../../atoms/state-atom-control/types";

export type RadioItem<T extends BaseObject> = Pick<
  RadioContent<T>,
  "value" | "label" | "details"
> & {
  disabled?: boolean;
};

export type RadioGroupProps<T extends BaseObject> = Pick<
  RadioProps<T>,
  "id" | "onChange" | "size" | "value"
> & {
  name: string;
  label?: ReactNode;

  items: RadioItem<T>[];

  message?: AtomMessageProps;

  disabled?: boolean;
  required?: boolean;
  className?: string;

  /**
   * Radio's state.
   */
  state?: StateAtomControlContextType["state"];
};

export function RadioGroup<T extends BaseObject>({
  id,
  name,
  items,
  onChange,
  value,
  message,
  disabled = false,
  required = false,
  size = "s",
  label,
  state,
  ref,
}: PropsWithElementRef<RadioGroupProps<T>, HTMLDivElement>) {
  return (
    <StateAtomControlProvider state={state}>
      {label && (
        <div className="mb-1">
          <StateAtomLabel
            required={required}
            size={size}
            htmlFor={id ?? "UNDEFINED_ID"}
          >
            {label}
          </StateAtomLabel>
        </div>
      )}

      <div ref={ref} className="flex flex-col gap-2" id={id}>
        {items.map((item, index) => {
          const radioId = `${id}-${index}`;
          const radioKey = `radio-${
            typeof item.value === "object" ? item.value.id : String(item.value)
          }`;

          return (
            <Radio
              {...item}
              id={radioId}
              state={state}
              checked={isEqual(value, item.value)}
              key={radioKey}
              name={name}
              onChange={onChange}
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
