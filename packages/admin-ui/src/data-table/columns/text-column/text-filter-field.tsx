import { useEffect, useRef } from "react";

import { SubmitInput } from "iqf-web-ui/submit-input";

import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";

function TextFilterFieldContent({
  onChange,
  textType,
}: Pick<FilterComponentProps, "textType"> & {
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (!ref.current?.value) return;

    onChange(ref.current.value);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ref.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <SubmitInput
      ref={ref}
      placeholder="Přidat hodnotu"
      onSubmit={onSubmit}
      type={textType}
      clearAfterSubmit={true}
    />
  );
}

export function TextFilterField({ textType, ...props }: FilterComponentProps) {
  return (
    <BaseFilterField
      {...props}
      content={({ onChange }) => (
        <TextFilterFieldContent
          onChange={(value) => onChange({ value })}
          textType={textType}
        />
      )}
    />
  );
}

/**
 * @deprecated Use `TextFilterField` instead.
 */
export const FilterTextField = TextFilterField;
