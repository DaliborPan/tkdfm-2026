import { FormTable, type FormTableProps } from "../RHF-fields/form-table";
import { useFormContext } from "../context/form-context";

export type TableFieldProps = FormTableProps & {
  readOnly?: boolean;
};

export function TableField({ readOnly = false, ...props }: TableFieldProps) {
  const { editing } = useFormContext();

  return (
    <FormTable {...props} disabled={!editing || readOnly} readOnly={readOnly} />
  );
}
