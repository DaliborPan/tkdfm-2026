import { Plus } from "lucide-react";
import { useIntl } from "react-intl";

import { Button } from "../../../atoms/button";
import { useDataTableContext } from "../../context";

export function DataTableDefaultToolbar({
  showNew = true,
}: {
  showNew?: boolean;
}) {
  const intl = useIntl();

  const table = useDataTableContext();

  return (
    <>
      {showNew && (
        <Button href={`${table.url}/+`} iconLeft={{ Icon: Plus }}>
          {intl.formatMessage({
            id: "data-table.create",
            defaultMessage: "Přidat nový záznam",
          })}
        </Button>
      )}
    </>
  );
}
