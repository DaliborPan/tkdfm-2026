import { type BaseObject } from "iqf-web-ui/base";

import { withPrefix } from "./base-column";
import { type IqfColumnDef } from "./types";

/**
 * This function should be used in case you're creating columns for entity EntityA, which has a relationship to entity entityB.
 * The relationship should be something like `type EntityA = { entityB: EntityB }`. If `EntityB` already has columns defined,
 * you can use `useColumn` function to reuse already defined columns.
 *
 * @example
 *
 * type Person = { firstName: string, lastName: string }
 * type Event = { name: string, teacher: Person }
 *
 * // modules/event/columns.ts
 * import { useFirstNameColumn, useLastNameColumn } from "modules/person/columns";
 *
 * const { tableColumn, useColumn } = new TypedColumns<Event>();
 *
 * export function useColumn() {
 *  const teacherFirstNameColumn = useColumn(useFirstNameColumn, "teacher");
 *
 * return [
 *      // other event columns
 *
 *      teacherFirstNameColumn,
 *   ]
 * }
 *
 * @todo Typing should be improved - There should be a relationship between the `TCastAsType` and `TGivenUseColumnData`
 * Example: `TGivenUseColumnData` is `BaseObject & { name: string }`, then
 * `TCastAsType` should be `BaseObject & { <prefix>: TGivenUseColumnData }`
 */
export function useColumn<
  TCastAsType extends BaseObject,
  TGivenUseColumnData extends BaseObject = BaseObject,
>(_useColumn: () => IqfColumnDef<TGivenUseColumnData>, prefix?: string) {
  const columnDef = _useColumn() as IqfColumnDef<TCastAsType>;

  return !prefix ? columnDef : withPrefix(columnDef, prefix);
}
