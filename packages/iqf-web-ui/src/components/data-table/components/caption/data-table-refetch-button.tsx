import { RotateCcw } from "lucide-react";
import { useIntl } from "react-intl";

import { errorToast, successToast } from "../../../atoms/toast";
import { useDataTableContext } from "../../context";
import { DataTableCaptionButton } from "./data-table-caption-button";

export function DataTableRefetchButton() {
  const intl = useIntl();
  const table = useDataTableContext();

  return (
    <DataTableCaptionButton
      iconLeft={
        table.dataQuery.isRefetching
          ? undefined
          : {
              Icon: RotateCcw,
              className: "size-4",
            }
      }
      tooltip={intl.formatMessage({
        id: "data-table.refetch",
        defaultMessage: "Načíst znovu",
      })}
      isLoading={table.dataQuery.isRefetching}
      onClick={async () => {
        const result = await table.dataQuery.refetch();

        if (result.error) {
          errorToast(
            intl.formatMessage({
              id: "data-table.refetch-error",
              defaultMessage: "Při načítání dat došlo k chybě",
            }),
          );

          return;
        }

        successToast(
          intl.formatMessage({
            id: "data-table.refetch-success",
            defaultMessage: "Data byla znovu načtena",
          }),
        );
      }}
    />
  );
}
