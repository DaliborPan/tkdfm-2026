import { type PropsWithChildren } from "react";

import { cn } from "../../../utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../atoms/table";

function SimpleTableHeader({ children }: PropsWithChildren) {
  return <TableHeader>{children}</TableHeader>;
}

function SimpleTableBody({ children }: PropsWithChildren) {
  return <TableBody>{children}</TableBody>;
}

function SimpleTableHead({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <TableHead className={cn("pl-2 text-sm font-semibold", className)}>
      {children}
    </TableHead>
  );
}

function SimpleTableRow({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <TableRow className={cn("flex items-center", className)}>
      {children}
    </TableRow>
  );
}

function SimpleTableCell({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <TableCell className={cn("pl-4", className)}>{children}</TableCell>;
}

function SimpleTable({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <Table className={cn("table-fixed p-5", className)}>{children}</Table>;
}

SimpleTable.Header = SimpleTableHeader;
SimpleTable.Body = SimpleTableBody;
SimpleTable.Head = SimpleTableHead;
SimpleTable.Row = SimpleTableRow;
SimpleTable.Cell = SimpleTableCell;

export { SimpleTable };
