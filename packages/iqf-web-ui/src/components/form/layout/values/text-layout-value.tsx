import { TextValue, type TextValueProps } from "../../values/text-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type TextLayoutValueProps = TextValueProps & CommonLayoutValueProps;

export function TextLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: TextLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <TextValue {...props} />
    </LayoutGroupItem>
  );
}
