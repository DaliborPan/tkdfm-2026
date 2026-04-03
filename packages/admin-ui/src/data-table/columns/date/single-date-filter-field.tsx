import { useEffect, useRef, useState } from "react";

import { SubmitDateInput } from "iqf-web-ui/submit-input";

import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";

function SingleDateFilterFieldContent({
  onChange,
  dateType,
}: Pick<FilterComponentProps, "dateType"> & {
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string | null>("");

  const onSubmit = () => {
    if (!inputValue) return;

    onChange(inputValue);

    setInputValue(null);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ref.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <SubmitDateInput
      ref={ref}
      type={dateType}
      placeholder="Přidat hodnotu"
      onSubmit={onSubmit}
      clearAfterSubmit={true}
      submitButtonProps={{
        disabled: !inputValue,
      }}
      onChange={(value) => setInputValue(value)}
    />
  );
}

export function SingleDateFilterField({
  dateType,
  ...props
}: FilterComponentProps) {
  return (
    <BaseFilterField
      {...props}
      content={({ onChange }) => (
        <SingleDateFilterFieldContent
          onChange={(value) => onChange({ value })}
          dateType={dateType}
        />
      )}
    />
  );
}

/**
 * @deprecated Use `SingleDateFilterField` instead.
 */
export const FilterSingleDateField = SingleDateFilterField;
