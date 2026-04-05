import { forwardRef } from "react";

import { Icon as IconComponent } from "iqf-web-ui/icon";
import { Label } from "iqf-web-ui/label";
import { ChevronDown } from "lucide-react";

import { type FilterComponentProps } from "../../types";
import { useFilterState } from "./filter-state";

export const FilterFieldTrigger = forwardRef<
  HTMLButtonElement,
  FilterComponentProps
>(function FilterFieldTrigger(
  { id, label, Icon, options, labelMapper, autocompleteOptions, ...props },
  ref,
) {
  if (!id) throw new Error("FilterFieldTrigger: id is required");

  const { filterValue } = useFilterState(id);

  const firstValue =
    filterValue.length > 0
      ? (labelMapper?.(filterValue[0]) ?? filterValue[0])
      : label;

  const restValue = filterValue.length > 1 ? "..." : "";
  const valueLabel = `${firstValue} ${restValue}`;

  return (
    <>
      <Label htmlFor={id} className="mb-1 inline-block">
        {label}
      </Label>

      <button ref={ref} id={id} className="w-full" {...props}>
        <div className="text-text-terciary flex h-8 items-center rounded-lg border border-neutral-700 py-1 pr-2 pl-3 transition-all hover:bg-neutral-50">
          {Icon && <IconComponent Icon={Icon} className="mr-2.5 size-4" />}

          <span className="text-text-secondary grow truncate text-left text-sm">
            {valueLabel}
          </span>

          <div className="flex items-center">
            {filterValue.length !== 0 && (
              <div className="bg-primary top-5 left-6 block rounded-full px-2 py-0.5 text-xs font-bold text-white">
                {filterValue.length}
              </div>
            )}

            <IconComponent Icon={ChevronDown} className="ml-1" />
          </div>
        </div>
      </button>
    </>
  );
});
