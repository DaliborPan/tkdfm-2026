import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

import { type BaseObject } from "../../../evidence/base";
import { ComboboxContent, ComboboxTrigger } from "./components";
import { DEFAULT_MAX_HEIGHT } from "./components/combobox-content";
import { ComboboxPopover } from "./components/combobox-popover";
import { useComboboxInfiniteQuery } from "./hooks/combobox-infinite-query";
import { type ComboboxProps } from "./types";
import {
  defaultIdMapper,
  getComboboxQueryKey,
  getLabelMappers,
  hasEnoughOptionsToShowSearchInput,
} from "./utils";

export function Combobox<TValueItem, TOption extends BaseObject>({
  queryKeyId,
  value,
  iconRight = { Icon: Search, className: "pointer-events-auto" },
  options: comboboxOptions,
  onChange,
  multiple,
  maxHeight = DEFAULT_MAX_HEIGHT,
  minQueryLength = 0,
  placeholder,

  valueLabelMapper: propsValueLabelMapper,
  optionLabelMapper: propsOptionLabelMapper,

  valueMapper = (option) => option as unknown as TValueItem,

  idMapper = defaultIdMapper,

  ...props
}: ComboboxProps<TValueItem, TOption>) {
  const { optionLabelMapper, valueLabelMapper } = getLabelMappers({
    propsValueLabelMapper,
    propsOptionLabelMapper,
  });

  const queryClient = useQueryClient();

  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [totalRowsCount, setTotalRowsCount] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

  const { rows, infiniteQuery, parentRef, rowVirtualizer } =
    useComboboxInfiniteQuery({
      id: queryKeyId,
      query: debouncedQuery,
      comboboxOptions,
      enabled: open,
      minQueryLength,
      setTotalRowsCount,
    });

  /**
   * Handles open state of combobox menu (popover content).
   *
   * On menu open (`newOpenState === true`), sets query cache of initial fetch
   * to `{ pages: [], pageParams: []}` and removes all queries. Hence, on reopen,
   * we're fetching new data from the server.
   */
  const onOpenChange = (newOpenState: boolean) => {
    setOpen(newOpenState);

    if (newOpenState) {
      setTotalRowsCount(0);

      queryClient.setQueryData(
        getComboboxQueryKey({
          id: queryKeyId,
          params: comboboxOptions.params,
        }),
        {
          pages: [],
          pageParams: [],
        },
      );

      queryClient.removeQueries({
        queryKey: getComboboxQueryKey({ id: queryKeyId }),
      });
    } else {
      setQuery("");
      parentRef.current?.scrollTo({ top: 0 });
    }
  };

  /**
   * Handles removing option on !multiple combobox - setting `value` to `null`.
   */
  const onRemoveValue = () => {
    setQuery("");
    onChange(null);

    if (!open) {
      triggerRef.current?.focus();
    }
  };

  /**
   * Handles removing valueItem from multiple value.
   *
   * If `removedValueItem` is the last valueItem in the `value`,
   * value is set to `null`.
   */
  const onRemoveValueItem = (removedValueItem: TValueItem) => {
    if (!multiple || !value) return;

    const filteredValue = value.filter(
      (valueItem) => idMapper(valueItem) !== idMapper(removedValueItem),
    );

    onChange(filteredValue.length === 0 ? null : filteredValue);

    if (!open) {
      triggerRef.current?.focus();
    }
  };

  /**
   * Handles clicking on option in combobox list.
   */
  const onSelectOption = (option: TOption) => {
    const mappedValueItem = valueMapper(option);

    if (multiple) {
      const optionInValue = (value || []).some(
        (valueItem) => idMapper(valueItem) === option.id,
      );

      if (optionInValue) {
        onRemoveValueItem(mappedValueItem);
      } else {
        onChange([...(value || []), mappedValueItem], option);
      }
    } else {
      onChange(mappedValueItem, option);
      onOpenChange(false);
    }
  };

  const onReset = props.onReset
    ? () => {
        props.onReset?.();
        triggerRef.current?.focus();
      }
    : undefined;

  const trigger = (
    <ComboboxTrigger
      {...props}
      ref={triggerRef}
      valueLabelMapper={valueLabelMapper}
      idMapper={idMapper}
      aria-expanded={open}
      iconRight={iconRight}
      placeholder={placeholder}
      onReset={onReset}
      {...(multiple
        ? { multiple: true, value, onRemoveValueItem }
        : { multiple: false, value, onRemoveValue })}
    />
  );

  const content = (
    <ComboboxContent
      ref={parentRef}
      options={rows}
      onSelectOption={onSelectOption}
      rowVirtualizer={rowVirtualizer}
      idMapper={idMapper}
      onInput={(e) => {
        setQuery(e.currentTarget.value);
      }}
      isFetching={infiniteQuery.isFetching}
      minQueryLength={
        debouncedQuery.length < minQueryLength ? minQueryLength : undefined
      }
      optionLabelMapper={optionLabelMapper}
      maxHeight={maxHeight}
      placeholder={placeholder}
      enableSearch={
        hasEnoughOptionsToShowSearchInput(totalRowsCount) || minQueryLength > 0
      }
      {...(multiple ? { multiple: true, value } : { multiple: false, value })}
    />
  );

  return (
    <ComboboxPopover
      triggerRef={triggerRef}
      maxHeight={maxHeight}
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      content={content}
    />
  );
}
