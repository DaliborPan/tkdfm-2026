"use client";

import { DatabaseBackup, RotateCcw, Settings } from "lucide-react";

import { Button } from "iqf-web-ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "iqf-web-ui/dropdown";
import { Icon } from "iqf-web-ui/icon";
import { usePreferenceSource } from "iqf-web-ui/settings";
import { errorToast, successToast } from "iqf-web-ui/toast";

import { useDataTableContext } from "../../context";

export function DataTableSettings() {
  const preferences = usePreferenceSource();

  const table = useDataTableContext();

  return (
    <Dropdown>
      <DropdownTrigger asChild={true}>
        <Button
          iconLeft={{ Icon: Settings }}
          size="m"
          variant="base"
          tooltip="Nastavení"
        />
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem className="w-full py-2" asChild={true}>
          <button
            onClick={async () => {
              const result = await table.dataQuery.refetch();

              if (result.error) {
                errorToast("Při načítání dat došlo k chybě");

                return;
              }

              successToast("Data byla znovu načtena");
            }}
          >
            <Icon Icon={RotateCcw} className="mr-3 size-3.5" />
            <span>Načíst znovu</span>
          </button>
        </DropdownItem>
        <DropdownItem className="py-2" asChild={true}>
          <button
            onClick={async () => {
              try {
                await preferences.remove(table.tableId);
                table.resetColumnFilters();
                table.resetColumnOrder();
                table.resetColumnSizing();
                table.resetSorting();
                table.resetColumnVisibility();

                successToast("Nastavení bylo obnoveno");
              } catch {
                errorToast("Při obnově nastavení došlo k chybě");
              }
            }}
          >
            <Icon Icon={DatabaseBackup} className="mr-3 size-3.5" />
            <span>Obnovit nastavení tabulky</span>
          </button>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
