import { LayoutGroupItem } from "../../layout-group-item";
import { ChipValue, type ChipValueProps } from "../value/chip-value";

export type StaticChipFieldProps = ChipValueProps & {
  label: string;
};

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticChipField({ label, ...props }: StaticChipFieldProps) {
  return (
    <LayoutGroupItem label={label}>
      <ChipValue {...props} />
    </LayoutGroupItem>
  );
}
