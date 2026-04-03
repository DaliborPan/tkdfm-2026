import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "iqf-web-ui/button";
import { DateInput } from "iqf-web-ui/date-input";

import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";
import { type RangeValue } from "../types";

function DateInRangeFilterFieldContent({
  dateType = "date",
  onChange,
}: Pick<FilterComponentProps, "dateType"> & {
  onChange: (value: RangeValue) => void;
}) {
  const [inputValue, setInputValue] = useState<RangeValue>({
    from: null,
    to: null,
  });

  const fromRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (!inputValue.from && !inputValue.to) return;

    onChange({
      from: inputValue.from,
      to: inputValue.to,
    });

    setInputValue({ from: null, to: null });
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      fromRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex items-end gap-2">
      <div className="grow">
        <DateInput
          id="from"
          className="relative"
          ref={fromRef}
          label="Od"
          type={dateType}
          value={inputValue.from ?? ""}
          onKeyDown={(e) => {
            const key = e.key;

            if (key === "Enter") {
              onSubmit();
            }
          }}
          onChange={(value) => {
            setInputValue((prev) => ({ ...prev, from: value }));
          }}
        />
      </div>

      <div className="grow">
        <DateInput
          id="to"
          label="Do"
          type={dateType}
          value={inputValue.to ?? ""}
          onChange={(value) => {
            setInputValue((prev) => ({ ...prev, to: value }));
          }}
        />
      </div>

      <Button
        size="xs"
        variant="base"
        className="mb-[2px] mr-[2px] size-7 px-5"
        iconLeft={{ Icon: PlusCircle, className: "size-5" }}
        disabled={!inputValue.from && !inputValue.to}
        onClick={onSubmit}
      />
    </div>
  );
}

export function DateInRangeFilterField({
  dateType,
  ...props
}: FilterComponentProps) {
  return (
    <BaseFilterField
      {...props}
      content={({ onChange }) => (
        <DateInRangeFilterFieldContent
          onChange={(value) => onChange({ value })}
          dateType={dateType}
        />
      )}
    />
  );
}

/**
 * @deprecated Use `DateInRangeFilterField` instead.
 */
export const FilterDateInRangeField = DateInRangeFilterField;
