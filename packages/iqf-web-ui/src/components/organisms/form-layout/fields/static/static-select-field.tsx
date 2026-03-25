import { type BaseObject } from "../../../../../evidence/base";
import { LayoutGroupItem } from "../../layout-group-item";
import { SelectValue, type SelectValueProps } from "../value/select-value";

export type StaticSelectFieldProps<
  TValue,
  TOption extends BaseObject,
> = SelectValueProps<TValue, TOption> & {
  label?: string;
  options: TOption[];
};

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticSelectField<TValue, TOption extends BaseObject>({
  label,
  ...props
}: StaticSelectFieldProps<TValue, TOption>) {
  return (
    <LayoutGroupItem label={label}>
      <SelectValue {...props} />
    </LayoutGroupItem>
  );
}
