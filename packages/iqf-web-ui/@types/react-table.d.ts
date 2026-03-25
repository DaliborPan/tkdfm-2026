import { type BaseColumnMeta } from "iqf-web-ui/data-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ColumnMeta extends BaseColumnMeta {}
}
