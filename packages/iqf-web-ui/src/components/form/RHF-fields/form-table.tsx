import { Plus, Trash2 } from "lucide-react";
import { type ReactNode } from "react";
import { useFieldArray } from "react-hook-form";
import { useIntl } from "react-intl";

import { cn } from "../../../utils/cn";
import { createId } from "../../../utils/create-id";
import { AtomMessage } from "../../atoms/atom-message";
import { Button } from "../../atoms/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../atoms/table";
import { Confirm } from "../../molecules/confirm";
import { useFormContext } from "../context/form-context";
import { FormField } from "../form-field";

export type FormTableColumn = {
  id: string;
  width: number;
  label: string;
  headerClassName?: string;
  rowClassName?: string;
  cell: (props: FormTableFieldProps) => ReactNode;
};

export type FormTableProps = {
  label?: string;
  name: string;
  className?: string;
  columns: FormTableColumn[];
  disabled?: boolean;
  readOnly?: boolean;
  newItemDefaultValues?: Record<string, any>;
};

export type FormTableFieldProps = {
  name: string;
  index: number;
  readOnly?: boolean;
  row: any;
};

function RemoveRowAction({ remove }: { remove: () => void }) {
  const intl = useIntl();

  const { editing } = useFormContext();

  return (
    <Confirm
      title={intl.formatMessage({
        id: "form-table.remove-record-title",
        defaultMessage: "Odstranit řádek",
      })}
      content={intl.formatMessage({
        id: "form-table.remove-record-content",
        defaultMessage: "Chcete odstanit tento řádek?",
      })}
      onDecision={(confirmed) => {
        if (confirmed) {
          remove();
        }
      }}
    >
      <Button
        color="error"
        variant="base"
        disabled={!editing}
        iconRight={{ Icon: Trash2 }}
        tooltip={intl.formatMessage({
          id: "form-table.remove-record-tooltip",
          defaultMessage: "Odstranit řádek",
        })}
      />
    </Confirm>
  );
}

export function FormTable({
  label,
  name,
  className = "",
  columns,
  disabled,
  readOnly,
  newItemDefaultValues,
}: FormTableProps) {
  const { control, watch, editing } = useFormContext();
  const { append, fields, remove } = useFieldArray({
    name,
    control,
  });

  const watchedFields = watch(name);

  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchedFields[index],
  }));

  const intl = useIntl();

  return (
    <FormField
      control={control}
      name={name}
      render={({ fieldState: { error } }) => (
        <div className="flex flex-col">
          <Table className={className}>
            {label && (
              <TableCaption className="mx-4 my-2 caption-top text-left text-neutral-500">
                {label}
              </TableCaption>
            )}

            <TableHeader>
              <TableRow
                className="flex min-w-full items-center"
                style={{
                  width: columns.reduce((acc, column) => acc + column.width, 0),
                }}
              >
                {!disabled && (
                  <TableHead key="add" className="w-14 py-1 pl-1 text-sm">
                    <Button
                      variant="base"
                      disabled={!editing}
                      iconRight={{ Icon: Plus }}
                      tooltip={intl.formatMessage({
                        id: "form-table.add-record",
                        defaultMessage: "Přidat záznam",
                      })}
                      onClick={() => {
                        append({
                          id: createId(),
                          ...newItemDefaultValues,
                        });
                      }}
                    />
                  </TableHead>
                )}

                {columns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={cn("py-1 pl-1 text-sm", column.headerClassName)}
                    style={{ width: `${column.width + 4}px` }}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {controlledFields.length === 0 && (
                <TableRow>
                  <TableCell className="w-full p-0 pl-1">
                    <div className="text-center leading-10 text-neutral-500">
                      {intl.formatMessage({
                        id: "form-table.no-records",
                        defaultMessage: "Žádné záznamy",
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {controlledFields.map((row, rowIndex) => (
                <TableRow key={row.id} className="flex items-center">
                  {!disabled && (
                    <TableCell key="add" className="w-14 py-1 pl-1">
                      <RemoveRowAction remove={() => remove(rowIndex)} />
                    </TableCell>
                  )}

                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className={cn(
                        "mr-1 py-0 pl-1 [&_>_div]:overflow-visible",
                        column.rowClassName,
                      )}
                      style={{ width: `${column.width}px` }}
                    >
                      {column.cell({
                        name: `${name}.${rowIndex}.${column.id}`,
                        index: rowIndex,
                        readOnly,
                        row,
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {error && <AtomMessage text={error.message} />}
        </div>
      )}
    />
  );
}
