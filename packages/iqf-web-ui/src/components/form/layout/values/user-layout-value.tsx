import { UserValue, type UserValueProps } from "../../values/user-value";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutValueProps } from "./types";

export type UserLayoutValueProps = UserValueProps & CommonLayoutValueProps;

export function UserLayoutValue({
  label,
  layoutClassName,
  labelClassName,
  ...props
}: UserLayoutValueProps) {
  return (
    <LayoutGroupItem
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
    >
      <UserValue {...props} />
    </LayoutGroupItem>
  );
}
