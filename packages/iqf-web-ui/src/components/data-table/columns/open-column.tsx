import { PanelLeftOpen } from "lucide-react";
import { useIntl } from "react-intl";

import { type BaseObject } from "../../../evidence/base";
import { useSettingsContext } from "../../../settings/context";
import { Icon } from "../../atoms/icon";
import { type IqfColumnDef } from "./types";

export function useOpenColumn<TData extends BaseObject>({
  hrefMapper = (row) => `/${row.id}`,
}: {
  hrefMapper?: (row: TData) => string;
} = {}) {
  const intl = useIntl();
  const {
    router: { Link },
  } = useSettingsContext();

  return {
    id: "open",
    cell: ({ row }) => (
      <Link
        href={hrefMapper(row.original)}
        className="flex items-center font-semibold text-primary underline"
      >
        {intl.formatMessage({
          id: "data-table.open",
          defaultMessage: "Otevřít",
        })}

        <Icon Icon={PanelLeftOpen} className="ml-4 w-4" />
      </Link>
    ),
    size: 100,

    enableGlobalFilter: false,
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  } as IqfColumnDef<TData>;
}
