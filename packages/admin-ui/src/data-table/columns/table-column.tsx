import { type BaseObject } from "iqf-web-ui/base";

import { createActionsColumn } from "./actions-column";
import { createBooleanColumn } from "./boolean-column";
import { createComboboxColumn } from "./combobox-column";
import { createDateColumn } from "./date-column";
import { createDateTimeColumn } from "./date-time-column/date-time-column";
import { createEnumColumn } from "./enum-column/enum-column";
import { createInstantColumn } from "./instant-column";
import { createNumberColumn } from "./number-column";
import { createTextColumn } from "./text-column";
import { createTimeColumn } from "./time-column";
import {
  type ActionsTableColumnOptions,
  type BooleanTableColumnOptions,
  type ComboboxTableColumnOptions,
  type DateTableColumnOptions,
  type DateTimeTableColumnOptions,
  type EnumTableColumnOptions,
  type InstantTableColumnOptions,
  type IqfColumnDef,
  type NumberTableColumnOptions,
  type TextTableColumnOptions,
  type TimeTableColumnOptions,
} from "./types";

export const tableColumn = {
  text: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: TextTableColumnOptions<TData>,
  ) => {
    return createTextColumn(options) as IqfColumnDef<TCastAsType>;
  },

  number: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: NumberTableColumnOptions<TData>,
  ) => {
    return createNumberColumn(options) as IqfColumnDef<TCastAsType>;
  },

  enum: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: EnumTableColumnOptions<TData>,
  ) => {
    return createEnumColumn(options) as IqfColumnDef<TCastAsType>;
  },

  actions: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: ActionsTableColumnOptions<TData>,
  ) => {
    return createActionsColumn(options) as IqfColumnDef<TCastAsType>;
  },

  datetime: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: DateTimeTableColumnOptions<TData>,
  ) => {
    return createDateTimeColumn(options) as IqfColumnDef<TCastAsType>;
  },

  instant: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: InstantTableColumnOptions<TData>,
  ) => {
    return createInstantColumn(options) as IqfColumnDef<TCastAsType>;
  },

  date: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: DateTableColumnOptions<TData>,
  ) => {
    return createDateColumn(options) as IqfColumnDef<TCastAsType>;
  },

  time: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: TimeTableColumnOptions<TData>,
  ) => {
    return createTimeColumn(options) as IqfColumnDef<TCastAsType>;
  },

  boolean: <TData extends BaseObject, TCastAsType extends BaseObject = TData>(
    options: BooleanTableColumnOptions<TData>,
  ) => {
    return createBooleanColumn(options) as IqfColumnDef<TCastAsType>;
  },

  combobox: <
    TOption extends BaseObject,
    TData extends BaseObject,
    TCastAsType extends BaseObject = TData,
  >(
    options: ComboboxTableColumnOptions<TData, TOption>,
  ) => {
    return createComboboxColumn(options) as IqfColumnDef<TCastAsType>;
  },
};
