import { DateValue, type DateValueProps } from "../../values/date-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type DateLayoutValueProps = DateValueProps & CommonLayoutValueProps;

export function DateLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: DateLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <DateValue {...props} />
    </LayoutGroupItem>
  );
}
