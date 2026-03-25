import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { Button } from "../../../atoms/button";
import { DateInput } from "../../../molecules/date-input";
import { type FilterComponentProps } from "../../types";
import { BaseFilterField } from "../base-filter-field";
import { type RangeValue } from "../types";

function DateInRangeFilterFieldContent({
  dateType = "date",
  onChange,
}: Pick<FilterComponentProps, "dateType"> & {
  onChange: (value: RangeValue) => void;
}) {
  const intl = useIntl();

  const [inputValue, setInputValue] = useState<RangeValue>({
    from: null,
    to: null,
  });

  const fromRef = useRef<HTMLInputElement | null>(null);

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
          label={intl.formatMessage({
            id: "data-table.filter.date-from.label",
            defaultMessage: "Od",
          })}
          type={dateType}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          value={inputValue.from ?? ""}
          onChange={(value) => {
            setInputValue((prev) => ({ ...prev, from: value }));
          }}
        />
      </div>

      <div className="grow">
        <DateInput
          id="to"
          label={intl.formatMessage({
            id: "data-table.filter.date-to.label",
            defaultMessage: "Do",
          })}
          value={inputValue.to ?? ""}
          type={dateType}
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
