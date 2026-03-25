import { cn } from "../../../../utils/cn";
import { TableField, type TableFieldProps } from "../../fields/table-field";
import { LayoutGroupFieldItem } from "../layout-group-field-item";
import { type CommonLayoutFieldProps } from "./types";

export type TableLayoutFieldProps = TableFieldProps & CommonLayoutFieldProps;

export function TableLayoutField({
  layoutClassName,
  labelClassName,
  name,
  tooltip,
  ...props
}: TableLayoutFieldProps) {
  return (
    <LayoutGroupFieldItem
      name={name}
      className={cn(
        "px-0 [&_tbody_tr:last-of-type]:border-0 [&_tr]:px-3",
        layoutClassName,
      )}
      required={props.required}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <TableField {...props} name={name} />
    </LayoutGroupFieldItem>
  );
}
