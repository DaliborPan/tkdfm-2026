import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import { useIntl } from "react-intl";

import { type BaseObject } from "../../../evidence/base";
import {
  type VirtualizerHandle,
  useVirtualizer,
} from "../../../hooks/virtualizer";
import { type PropsWithElementRef } from "../../../types";
import { useInfiniteScroll } from "../../../utils/hooks/infinite-scroll-hook";
import { AutocompleteOption } from "./autocomplete-option";

type AutocompleteListProps<ItemType extends BaseObject> = {
  options: ItemType[];
  focusedIndex: number;
  selectedOptions: ItemType[];
  idMapper: (item: ItemType) => string;
  handleSelect: (option: ItemType) => void;
  labelMapper: (option: ItemType) => string;
  query: UseInfiniteQueryResult;
};

export function AutocompleteList<ItemType extends BaseObject>({
  options,
  focusedIndex,
  selectedOptions,
  idMapper,
  handleSelect,
  labelMapper,
  query,
  ref,
}: PropsWithElementRef<AutocompleteListProps<ItemType>, VirtualizerHandle>) {
  const intl = useIntl();

  const { parentRef, rowVirtualizer } = useVirtualizer({
    count: query.hasNextPage ? options.length + 1 : options.length,
    itemsSize: 44,
    ref,
  });

  useInfiniteScroll({ query, loadedCount: options.length, rowVirtualizer });

  return (
    <div
      ref={parentRef}
      className="max-h-[14.0625rem] w-[var(--radix-popover-trigger-width)] overflow-auto text-secondary-700"
    >
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const option = options[virtualRow.index];

          if (!option) {
            <div className="ml-[23px] px-2 py-3 text-secondary-700">
              {intl.formatMessage({
                id: "molecules.autocomplete.no-data",
                defaultMessage: "Žádná data",
              })}
            </div>;
          }

          return (
            <AutocompleteOption
              key={virtualRow.index}
              selected={
                !!selectedOptions.find(
                  (selected) => idMapper(selected) === idMapper(option),
                )
              }
              focused={focusedIndex === virtualRow.index}
              option={option}
              handleSelect={handleSelect}
              labelMapper={labelMapper}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
