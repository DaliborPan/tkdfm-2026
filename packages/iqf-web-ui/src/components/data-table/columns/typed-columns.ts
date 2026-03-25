import { type BaseObject } from "../../../evidence/base";
import { useOpenColumn } from "./open-column";
import { useSelectColumn } from "./select-column";
import { tableColumn } from "./table-column";
import { useColumn } from "./use-column";

type TypedColumnsDefaultOptions = {
  minSize?: number;
};

export class TypedColumns<TData extends BaseObject> {
  private prepareOptions = <TOptions extends TypedColumnsDefaultOptions>(
    options: TOptions,
  ) => options;

  constructor({ minSize }: TypedColumnsDefaultOptions = {}) {
    this.prepareOptions = <TOptions extends TypedColumnsDefaultOptions>(
      options: TOptions,
    ) => ({
      minSize: minSize ?? options.minSize,
      ...options,
    });
  }

  useSelectColumn = useSelectColumn<TData>;

  useOpenColumn = <T extends TData = TData>(
    options: Parameters<typeof useOpenColumn<T>>[0],
    // eslint-disable-next-line react-hooks/rules-of-hooks
  ) => useOpenColumn<T>(options);

  useColumn = <
    TCastAsType extends BaseObject = TData,
    TGivenUseColumnData extends BaseObject = BaseObject,
  >(
    ...args: Parameters<typeof useColumn<TCastAsType, TGivenUseColumnData>>
    // eslint-disable-next-line react-hooks/rules-of-hooks
  ) => useColumn<TCastAsType, TGivenUseColumnData>(...args);

  tableColumn = {
    text: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.text<TData>>[0],
    ) => tableColumn.text<TData, TCastAsType>(this.prepareOptions(options)),

    number: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.number<TData>>[0],
    ) => tableColumn.number<TData, TCastAsType>(this.prepareOptions(options)),

    enum: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.enum<TData>>[0],
    ) => tableColumn.enum<TData, TCastAsType>(this.prepareOptions(options)),

    actions: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.actions<TData>>[0],
    ) => tableColumn.actions<TData, TCastAsType>(this.prepareOptions(options)),

    instant: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.instant<TData>>[0],
    ) => tableColumn.instant<TData, TCastAsType>(this.prepareOptions(options)),

    datetime: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.datetime<TData>>[0],
    ) => tableColumn.datetime<TData, TCastAsType>(this.prepareOptions(options)),

    date: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.date<TData>>[0],
    ) => tableColumn.date<TData, TCastAsType>(this.prepareOptions(options)),

    time: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.time<TData>>[0],
    ) => tableColumn.time<TData, TCastAsType>(this.prepareOptions(options)),

    useBoolean: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.useBoolean<TData>>[0],
    ) =>
      tableColumn.useBoolean<TData, TCastAsType>(this.prepareOptions(options)),

    /**
     * @deprecated
     */
    autocomplete: <
      TAutocompleteType extends BaseObject,
      TCastAsType extends BaseObject = TData,
    >(
      options: Parameters<
        typeof tableColumn.autocomplete<TAutocompleteType, TData>
      >[0],
    ) =>
      tableColumn.autocomplete<TAutocompleteType, TData, TCastAsType>(
        this.prepareOptions(options),
      ),

    combobox: <
      TOption extends BaseObject,
      TCastAsType extends BaseObject = TData,
    >(
      options: Parameters<typeof tableColumn.combobox<TOption, TData>>[0],
    ) =>
      tableColumn.combobox<TOption, TData, TCastAsType>(
        this.prepareOptions(options),
      ),
  };
}
