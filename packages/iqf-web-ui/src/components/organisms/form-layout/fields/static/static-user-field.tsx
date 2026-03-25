import { LayoutGroupItem } from "../../layout-group-item";
import { UserValue, type UserValueProps } from "../value/user-value";

export type StaticUserFieldProps = UserValueProps & {
  label: string;
};

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticUserField({ label, ...props }: StaticUserFieldProps) {
  return (
    <LayoutGroupItem label={label}>
      <UserValue {...props} />
    </LayoutGroupItem>
  );
}
