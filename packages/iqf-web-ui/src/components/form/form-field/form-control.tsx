"use client";

import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef } from "react";

import { type StateAtomControlContextType } from "../../atoms/state-atom-control/types";
import { useFormField } from "./form-field";

/**
 * FormControl passes state to the Input, Select, ...
 * State can be "default", "success" or "error". it also passes an created in FormItem component
 *
 * FormControl must be used within a FormField component
 */
export function FormControl({
  ...props
}: ComponentPropsWithRef<typeof Slot> & {
  state?: StateAtomControlContextType["state"];
}) {
  const { error, formItemId, formDescriptionId, formMessageId, isDirty } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      state={error ? "error" : isDirty && !error ? "success" : "default"}
      {...props}
    />
  );
}
