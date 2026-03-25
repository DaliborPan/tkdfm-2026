import { TableRow } from "../../atoms/table";
import { useDataTableContext } from "../context";
import { DataTableCell } from "./data-table-cell";

function LoadingCell() {
  return (
    <div className="relative flex">
      {/* This invisible div ensures the cell height adapts automatically if the DataTableCell font style changes. */}
      <div className="invisible">a</div>
      <div className="absolute h-3 w-full animate-pulse self-center rounded-full bg-secondary-400" />
    </div>
  );
}

export function DataTableLoading() {
  const table = useDataTableContext();

  const numRows = 20;

  return (
    <>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={rowIndex}>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <DataTableCell
                key={header.id}
                className="first-of-type:pl-4"
                columnSize={header.getSize()}
              >
                <LoadingCell />
              </DataTableCell>
            )),
          )}
        </TableRow>
      ))}
    </>
  );
}
