import { useDataTableContext } from "../context";

export function DataTableFilterFields() {
  const table = useDataTableContext();

  const columns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter());

  return (
    <>
      {columns.map((column) => {
        const {
          label = column.id,
          FilterComponent,
          filterComponentProps,
        } = column.columnDef.meta ?? {};

        return !FilterComponent ? null : (
          <div className="w-full" key={column.id}>
            <FilterComponent
              {...filterComponentProps}
              label={label}
              id={column.id}
            />
          </div>
        );
      })}
    </>
  );
}
