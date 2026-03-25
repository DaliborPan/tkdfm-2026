import get from "lodash/get";
import {
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";

type FormValueProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
> = {
  name: TFieldName;

  /**
   * Value might be undefined, if there is no value in the form (for the `name`) yet.
   */
  children: (
    value: FieldPathValue<TFieldValues, TFieldName> | undefined,
  ) => React.ReactNode;
};

/**
 * Pomocí render prop pattern získá hodnotu z formuláře a předá ji do children funkce.
 */
export function FormValue<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, children }: FormValueProps<TFieldValues, TFieldName>) {
  const { control, getValues } = useFormContext();

  /**
   * useWatch se používá pro sledování změn hodnoty v poli formuláře. Nedá se však použít návratová hodnota, protože
   * useWatch vrací pouze hodnotu, která byla změněna. V případě, že se hodnota nezměnila, vrací prázdný řetězec.
   */
  useWatch({ name, control });

  // TODO: try using `watch` from useFormContext to avoid importing get from lodash
  const value = get(getValues(), name);

  return children(value);
}
