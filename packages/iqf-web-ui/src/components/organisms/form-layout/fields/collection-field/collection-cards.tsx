import { type SortingState } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";

import { type BaseObject } from "../../../../../evidence/base";
import { useInfiniteScroll } from "../../../../../hooks/infinite-scroll";
import { useVirtualizer } from "../../../../../hooks/virtualizer";
import { type IqfColumnDef } from "../../../../data-table/columns/types";
import { type ApiFilter } from "../../../../data-table/types";
import { useCollectionCardData } from "./hooks/browse";

export function DataCards<TCollectionData extends BaseObject>({
  queryKey,
  preFilters,
  api,
  defaultSorting,
  params,
  content,
  columns,
}: {
  queryKey: string[];
  preFilters?: ApiFilter[];
  api: string;
  defaultSorting?: SortingState;
  params?: Record<string, any>;
  content: (data: TCollectionData) => ReactNode;
  columns: IqfColumnDef<TCollectionData>[];
}) {
  const intl = useIntl();

  const cardsQuery = useCollectionCardData<TCollectionData>(
    queryKey,
    api,
    columns,
    preFilters,
    defaultSorting,
    params,
  );

  const items = cardsQuery.data?.options ?? [];
  const { parentRef, rowVirtualizer } = useVirtualizer({
    count: cardsQuery.hasNextPage ? items.length + 1 : items.length,
    itemsSize: 400,
  });

  useInfiniteScroll({
    query: cardsQuery,
    loadedCount: items.length,
    rowVirtualizer,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div className="mt-2 h-full space-y-2 overflow-auto" ref={parentRef}>
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            const card = items[virtualRow.index];

            if (!card) {
              return null;
            }

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="mx-4 mb-4"
              >
                {content(card)}
              </div>
            );
          })}
        </div>
      </div>

      {virtualItems.length === 0 && (
        <p className="flex items-center justify-center text-sm text-secondary-700">
          {intl.formatMessage({
            id: "data-table.no-data",
            defaultMessage: "Žádná data",
          })}
        </p>
      )}
    </div>
  );
}
