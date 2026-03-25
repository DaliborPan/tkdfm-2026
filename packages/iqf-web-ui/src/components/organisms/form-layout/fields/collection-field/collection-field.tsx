import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { AlignJustify, Rows3 } from "lucide-react";
import { type ReactNode } from "react";

import { type BaseObject } from "../../../../../evidence/base";
import { apiFetch } from "../../../../../utils/api-fetch";
import { DataTable } from "../../../../data-table";
import {
  type ApiFilter,
  type DataTableProps,
} from "../../../../data-table/types";
import { Switch, useSwitch } from "../../../../molecules/switch";
import { DataCards } from "./collection-cards";

type CollectionFieldViewType = "card" | "table";

function DataTableToolbar({
  addButton,
  actions,
  switchControl,
}: {
  addButton: ReactNode;
  actions?: ReactNode;
  switchControl?: ReturnType<typeof useSwitch<CollectionFieldViewType>>;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <div className="flex w-full gap-x-2">
        {addButton}

        {switchControl && (
          <Switch
            {...switchControl}
            actions={[
              {
                id: "table",
                Icon: AlignJustify,
                tooltip: "Režim tabulky",
              },
              {
                id: "card",
                Icon: Rows3,
                tooltip: "Režim karet",
              },
            ]}
          />
        )}
      </div>
      {actions}
    </div>
  );
}

export type CollectionFieldProps<TCollectionData extends BaseObject, TValue> = {
  addButton?: ReactNode;
  actions?: ReactNode;
  queryKey: string[];
  preFilters?: ApiFilter[];
  api: string;
  params?: Record<string, any>;
  defaultSorting?: SortingState;
  tableOptions: {
    id: string;
    version: number;
    columns: ColumnDef<TCollectionData, TValue>[];
    defaultVisibility?: VisibilityState;
    onRowClick?: (data: TCollectionData) => void;
    contextMenuActions?: DataTableProps<TCollectionData>["contextMenuActions"];
  };
  cardOptions?: {
    content: (data: TCollectionData) => ReactNode;
  };
};

export function CollectionField<TCollectionData extends BaseObject, TValue>({
  addButton,
  actions,
  queryKey,
  preFilters,
  api,
  params,
  defaultSorting,
  tableOptions: {
    id,
    version,
    columns,
    defaultVisibility,
    onRowClick,
    contextMenuActions,
  },
  cardOptions,
}: CollectionFieldProps<TCollectionData, TValue>) {
  const switchControl = useSwitch<CollectionFieldViewType>({
    defaultValue: "card",
    preferenceGroupKey: id,
    preferenceVersion: version,
  });

  const toolbar = (
    <DataTableToolbar
      addButton={addButton}
      actions={actions}
      {...(cardOptions && { switchControl })}
    />
  );

  return (
    <div className="relative z-40 flex h-full min-w-full flex-col border-b bg-white">
      {(!cardOptions || switchControl.value === "table") && (
        <DataTable
          id={id}
          version={version}
          queryKey={queryKey}
          api={api}
          preFilters={preFilters}
          fetchData={async (options) => {
            return apiFetch({
              ...options,
              url: `${options.url}?${new URLSearchParams(params).toString()}`,
            });
          }}
          url=""
          columns={columns}
          onRowClick={onRowClick ?? (() => void 0)}
          contextMenuActions={contextMenuActions}
          defaultSorting={defaultSorting}
          defaultVisibility={defaultVisibility}
          defaultPagination={{
            pageSize: 10,
            pageIndex: 0,
          }}
          tableCaption={{
            showNew: false,
            showSearch: false,
            toolbar,
          }}
        />
      )}

      {cardOptions && switchControl.value === "card" && (
        <>
          <div className="w-full px-4 pt-2">{toolbar}</div>
          <DataCards
            queryKey={queryKey}
            api={api}
            preFilters={preFilters}
            content={cardOptions.content}
            defaultSorting={defaultSorting}
            params={params}
            columns={columns}
          />
        </>
      )}
    </div>
  );
}
