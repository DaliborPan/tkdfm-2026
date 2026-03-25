"use client";

import { useId } from "react";

import { type PropsWithElementRef } from "../../../types";
import { cn } from "../../../utils/cn";
import { FormItemContext } from "./form-item-context";

export function FormItem({
  className = "",
  id: suppliedId,
  ...props
}: PropsWithElementRef<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const id = useId();

  const value = {
    /**
     * When passed `id` as prop, it will be used as `id` for the form item.
     */
    id: suppliedId ?? id,
  };

  return (
    <FormItemContext.Provider value={value}>
      <div className={cn(className)} {...props} />
    </FormItemContext.Provider>
  );
}
