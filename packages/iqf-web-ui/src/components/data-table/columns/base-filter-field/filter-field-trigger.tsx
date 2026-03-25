import { ChevronDown } from "lucide-react";

import { type PropsWithElementRef } from "../../../../types";
import { Icon as IconComponent } from "../../../atoms/icon";
import { Label } from "../../../atoms/label";
import { type FilterComponentProps } from "../../types";
import { useFilterState } from "./filter-state";

export function FilterFieldTrigger({
  id,
  label,
  Icon,
  options,
  labelMapper,
  autocompleteOptions,
  ...props
}: PropsWithElementRef<FilterComponentProps, HTMLButtonElement>) {
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

      <button id={id} className="w-full" {...props}>
        <div className="flex h-8 items-center rounded-lg border border-neutral-700 py-1 pl-3 pr-2 text-text-terciary transition-all hover:bg-neutral-50">
          {Icon && <IconComponent Icon={Icon} className="mr-2.5 size-4" />}

          <span className="grow truncate text-left text-sm text-text-secondary">
            {valueLabel}
          </span>

          <div className="flex items-center">
            {filterValue.length !== 0 && (
              <div className="left-6 top-5 block rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                {filterValue.length}
              </div>
            )}

            <IconComponent Icon={ChevronDown} className="ml-1" />
          </div>
        </div>
      </button>
    </>
  );
}
