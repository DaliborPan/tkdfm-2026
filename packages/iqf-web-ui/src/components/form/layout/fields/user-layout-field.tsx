import { UserField, type UserFieldProps } from "../../fields/user-field";
import { LayoutGroupItem } from "../layout-group-item";
import { type CommonLayoutFieldProps } from "./types";

export type UserLayoutFieldProps = UserFieldProps & CommonLayoutFieldProps;

export function UserLayoutField({
  label,
  name,
  layoutClassName,
  labelClassName,
  tooltip,
  ...props
}: UserLayoutFieldProps) {
  return (
    <LayoutGroupItem
      id={name}
      label={label}
      className={layoutClassName}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      <UserField {...props} name={name} />
    </LayoutGroupItem>
  );
}
