import { TableCell, TableRow } from "../../components/table";

import { useDataTableContext } from "../context";

function LoadingCell() {
  return (
    <div className="relative flex">
      {/* This invisible div ensures the cell height adapts automatically if the DataTableCell font style changes. */}
      <div className="invisible">.</div>
      <div className="bg-secondary-400 absolute h-3 w-full animate-pulse self-center rounded-full" />
    </div>
  );
}

export function DataTableLoading() {
  const table = useDataTableContext();

  const rowsCount = 20;

  return (
    <>
      {Array.from({ length: rowsCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <TableCell
                key={header.id}
                className="first-of-type:pl-4"
                innerClassName="w-3/4"
                style={{
                  width: header.getSize(),
                }}
              >
                <LoadingCell />
              </TableCell>
            )),
          )}
        </TableRow>
      ))}
    </>
  );
}
