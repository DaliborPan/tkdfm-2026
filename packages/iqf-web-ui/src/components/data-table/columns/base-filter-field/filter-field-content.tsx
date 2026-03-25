import { CircleMinus, RotateCcw } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../../atoms/button";
import { Icon } from "../../../atoms/icon";
import { type FilterComponentProps } from "../../types";
import { useFilterState } from "./filter-state";

// TODO() extract to util maybe
function isEqual(a: unknown, b: unknown[]) {
  if (Array.isArray(a) && Array.isArray(b)) {
    const isObjectWithId = (value: unknown) =>
      typeof value === "object" && value !== null && "id" in value;

    if (a.every(isObjectWithId) && b.every(isObjectWithId)) {
      return (
        a.every((value) => b.some((bValue) => value.id === bValue.id)) &&
        a.length === b.length
      );
    }

    return a.length === b.length && a.every((value) => b.includes(value));
  }
}

export function FilterFieldContent({
  id,
  labelMapper,
  children,
}: FilterComponentProps & {
  children: (props: ReturnType<typeof useFilterState>) => React.ReactNode;
}) {
  const intl = useIntl();

  if (!id) throw new Error("FilterFieldContent: id is required");

  const { defaultValue, filterValue, onChange } = useFilterState(id);

  return (
    <>
      <div className="border-b p-4">
        {children({ defaultValue, filterValue, onChange })}
      </div>

      {filterValue.length === 0 ? (
        <span className="inline-block px-4 py-2 text-sm leading-6 text-text-secondary">
          {intl.formatMessage({
            id: "data-table.filter.no-value",
            defaultMessage: "Žádná hodnota",
          })}
        </span>
      ) : (
        <div className="flex flex-col gap-y-1 py-2">
          {filterValue.map((value) => (
            /**
             * TODO: Decide how to handle max width of content.
             *
             * Cannot set max-width on Popover.Content, because it is too small either when
             * detail is opened or on mobile.
             *
             * Maybe use container queries?
             */
            <div
              key={value ? (labelMapper?.(value) ?? `${value}`) : `${value}`}
              className="flex items-center gap-x-3 pl-4 pr-[19px] text-sm"
            >
              <span className="inline-block size-[5px] rounded-full bg-primary" />
              <span className="grow">{labelMapper?.(value) ?? `${value}`}</span>

              <Button
                size="xs"
                variant="base"
                className="z-20 px-2.5"
                onClick={() => onChange({ value })}
              >
                <Icon Icon={CircleMinus} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t p-2">
        <Button
          disabled={
            defaultValue
              ? isEqual(defaultValue, filterValue)
              : filterValue.length === 0
          }
          variant="base"
          iconLeft={{
            Icon: RotateCcw,
          }}
          size="xs"
          onClick={() => onChange({ clear: true })}
        >
          {intl.formatMessage({
            id: "data-table.filter.reset",
            defaultMessage: "Resetovat",
          })}
        </Button>
      </div>
    </>
  );
}
