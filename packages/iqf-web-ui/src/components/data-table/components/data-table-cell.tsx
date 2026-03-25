import { TableCell } from "../../atoms/table";

export function DataTableCell({
  children,
  columnSize,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  isResponsive?: boolean;
  innerClassName?: string;
  columnSize: string | number;
}) {
  const style: React.CSSProperties = {
    position: "relative",
    width: columnSize,
    paddingRight: "1.25rem",
  };

  return (
    <TableCell style={style} {...props}>
      {children}
    </TableCell>
  );
}
