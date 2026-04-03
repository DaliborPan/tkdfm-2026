import { Plus } from "lucide-react";

import { Button } from "iqf-web-ui/button";

import { useDataTableContext } from "../../context";

export function DataTableDefaultToolbar({
  showNew = true,
}: {
  showNew?: boolean;
}) {
  const table = useDataTableContext();

  return (
    <>
      {showNew && (
        <Button href={`${table.url}/+`} iconLeft={{ Icon: Plus }}>
          Přidat nový záznam
        </Button>
      )}
    </>
  );
}
