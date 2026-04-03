import { type BaseObject } from "iqf-web-ui/base";

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

  useColumn = <
    TCastAsType extends BaseObject = TData,
    TGivenUseColumnData extends BaseObject = BaseObject,
  >(
    ...args: Parameters<typeof useColumn<TCastAsType, TGivenUseColumnData>>
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

    boolean: <TCastAsType extends BaseObject = TData>(
      options: Parameters<typeof tableColumn.boolean<TData>>[0],
    ) => tableColumn.boolean<TData, TCastAsType>(this.prepareOptions(options)),

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
