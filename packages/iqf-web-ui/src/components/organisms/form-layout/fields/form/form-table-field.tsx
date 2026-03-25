import { cn } from "../../../../../utils";
import {
  FormTable,
  type FormTableProps,
} from "../../../../form/RHF-fields/form-table";
import { useFormContext } from "../../../../form/context/form-context";
import { LayoutGroupItem } from "../../layout-group-item";

export type FormTableFieldProps = FormTableProps & {
  readOnly?: boolean;
  layoutClassName?: string;
};

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormTableField({
  readOnly = false,
  layoutClassName,
  ...formTableProps
}: FormTableFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem
      className={cn(
        "px-0 [&_tbody_tr:last-of-type]:border-0 [&_tr]:px-3",
        layoutClassName,
      )}
    >
      <FormTable
        {...formTableProps}
        disabled={!editing || readOnly}
        readOnly={readOnly}
      />
    </LayoutGroupItem>
  );
}
