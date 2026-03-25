import { defaultIdMapper } from "../../../molecules/combobox";
import { useDataTableContext } from "../../context";
import { useDefaultColumnFilterValue } from "./default-column-filter-value";

type OnFilterChangeParams<TFilterValueItem> =
  | {
      value?: undefined;
      clear: true;
    }
  | {
      clear?: false;
      value?: TFilterValueItem;
    };

/**
 * Hook for managing filter state of a column.
 *
 * It returns:
 * - `filterValue` from tanstack table filterState
 * - `onChange` function for changing filter value, handling multiple values and clearing value from
 * filter if it is already there.
 * - `defaultValue` from column definition
 */
export function useFilterState<TFilterValueItem>(id: string) {
  const table = useDataTableContext();

  const column = table.getColumn(id);

  const filterValue = (column?.getFilterValue() ?? []) as TFilterValueItem[];
  const columnDefaultFilterValue =
    useDefaultColumnFilterValue<TFilterValueItem>(id);

  const onChange = ({ value }: OnFilterChangeParams<TFilterValueItem>) => {
    table.resetPageIndex();

    if (!value) {
      column?.setFilterValue(columnDefaultFilterValue);
      return;
    }

    const equals = (a: TFilterValueItem, b: TFilterValueItem) =>
      defaultIdMapper(a) === defaultIdMapper(b);

    const newFilterValue = filterValue.some((v) => equals(v, value))
      ? filterValue.filter((v) => !equals(v, value))
      : [...filterValue, value];

    column?.setFilterValue(
      newFilterValue.length === 0 ? undefined : newFilterValue,
    );
  };

  return {
    defaultValue: columnDefaultFilterValue,
    filterValue,
    onChange,
  };
}
