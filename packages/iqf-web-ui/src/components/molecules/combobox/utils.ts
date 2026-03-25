import { z } from "zod";

import { type BaseObject, baseSchema } from "../../../evidence/base";
import { type ComboboxOptionsParams } from "./combobox-options/types";
import { type ComboboxProps } from "./types";

type ComboboxQueryKeyOptions = {
  id: string;
  query?: string;
  params?: ComboboxOptionsParams;
};

/**
 * Checks if there are enough options to show search input.
 *
 * It's set to 7 because it's the number of options that can be displayed
 * without scrolling.
 */
export function hasEnoughOptionsToShowSearchInput(optionsCount: number) {
  return optionsCount > 7;
}

export function getComboboxQueryKey({
  id,
  query,
  params,
}: ComboboxQueryKeyOptions) {
  return [
    "combobox",
    id,
    ...(query ? [query] : []),
    ...(params ? [params] : []),
  ];
}

function parseTitle(item: unknown) {
  const parsed = z.object({ title: z.string() }).safeParse(item);

  if (parsed.success) {
    return parsed.data.title;
  }

  return null;
}

/**
 * The most common `optionLabelMapper` is to map `item` to `item.title`.
 */
export function defaultOptionLabelMapper<TOption extends BaseObject>(
  option: TOption,
) {
  return parseTitle(option) ?? option.id;
}

/**
 * The most common `valueLabelMapper` is to map `item` to `item.title`.
 */
export function defaultValueLabelMapper<TValueItem>(valueItem: TValueItem) {
  const parsedTitle = parseTitle(valueItem);

  if (parsedTitle) {
    return parsedTitle;
  }

  console.error("[valueLabelMapper]: Invalid valueItem: ", valueItem);
  return "";
}

/**
 * Two most common types of TValueItem are string (particular enum)
 * and SelectOptionType.
 */
export function defaultIdMapper<TValueItem>(value: TValueItem) {
  const parsed = baseSchema.safeParse(value);

  if (parsed.success) {
    return parsed.data.id;
  }

  return z.coerce.string().parse(value, {
    errorMap: () => ({
      message: "[idMapper]: Invalid value",
    }),
  });
}

/**
 * Returns `optionLabelMapper` and `valueLabelMapper` based on the provided props and
 * defaults (fallbacks).
 *
 * - valueLabelMapper - if provided via props, it's used. If `optionLabelMapper` was
 * provided, it's tried to be used as `valueLabelMapper` as well. If it fails, if
 * fallbacks to `fallbackValueLabelMapper`.
 *
 * - optionLabelMapper - if provided via props, it's used. If it's not provided, it
 * fallbacks to `fallbackOptionLabelMapper`.
 */
export function getLabelMappers<TValueItem, TOption extends BaseObject>({
  propsOptionLabelMapper,
  propsValueLabelMapper,

  fallbackOptionLabelMapper = defaultOptionLabelMapper,
  fallbackValueLabelMapper = defaultValueLabelMapper,
}: {
  /**
   * optionLabelMapper provided via props.
   */
  propsOptionLabelMapper: ComboboxProps<
    TValueItem,
    TOption
  >["optionLabelMapper"];

  /**
   * valueLabelMapper provided via props.
   */
  propsValueLabelMapper: ComboboxProps<TValueItem, TOption>["valueLabelMapper"];

  /**
   * Default optionLabelMapper, if not provided via props.
   */
  fallbackOptionLabelMapper?: typeof defaultOptionLabelMapper<TOption>;

  /**
   * Default valueLabelMapper, if not provided via props.
   */
  fallbackValueLabelMapper?: typeof defaultValueLabelMapper<TValueItem>;
}) {
  const optionLabelMapper = propsOptionLabelMapper ?? fallbackOptionLabelMapper;

  const valueLabelMapper = (valueItem: TValueItem | null) => {
    if (!valueItem) {
      return "";
    }

    if (propsValueLabelMapper) {
      return propsValueLabelMapper(valueItem);
    }

    if (propsOptionLabelMapper) {
      try {
        return propsOptionLabelMapper(valueItem as unknown as TOption);
      } catch {
        /** */
      }
    }

    return fallbackValueLabelMapper(valueItem);
  };

  return { optionLabelMapper, valueLabelMapper };
}
