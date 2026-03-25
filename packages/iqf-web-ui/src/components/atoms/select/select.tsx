import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  type ComboboxBaseOptionType,
  ComboboxContent,
  ComboboxPopover,
  ComboboxTrigger,
  DEFAULT_MAX_HEIGHT,
  defaultIdMapper,
  defaultOptionLabelMapper,
} from "../../molecules/combobox";
import { hasEnoughOptionsToShowSearchInput } from "../../molecules/combobox/utils";
import { type SelectProps } from "./types";

export function Select<TValueItem, TOption extends ComboboxBaseOptionType>({
  value,
  multiple,
  options,
  iconRight = { Icon: ChevronDown },
  onChange,
  maxHeight = DEFAULT_MAX_HEIGHT,
  autoFocus = false,
  enableSearch = true,
  placeholder,

  valueMapper = (option) => option as unknown as TValueItem,

  optionLabelMapper = defaultOptionLabelMapper,

  idMapper = defaultIdMapper,

  ...props
}: SelectProps<TValueItem, TOption>) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  /**
   * Focuses trigger on mount if `autoFocus` is set to `true`.
   */
  useEffect(() => {
    if (autoFocus) {
      const frame = requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });

      return () => cancelAnimationFrame(frame);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Maps valueItem to displayed string.
   */
  const valueLabelMapper = (valueItem: TValueItem | null) => {
    // Allowing valueItem to be `false` (boolean)
    const option =
      valueItem !== undefined &&
      valueItem !== null &&
      options.find((option) => option.id === idMapper(valueItem));

    return option ? optionLabelMapper(option) : null;
  };

  /**
   * Handles removing option on !multiple select - setting `value` to `null`.
   */
  const onRemoveValue = () => {
    onChange(null);

    if (!open) {
      triggerRef.current?.focus();
    }
  };

  /**
   * Handles removing valueItem from multiple value.
   *
   * If `removedValueItem` is the last valueItem in the `value`,
   * value is set to `null`.
   */
  const onRemoveValueItem = (removedValueItem: TValueItem) => {
    if (!multiple || !value) return;

    const filteredValue = value.filter(
      (valueItem) => idMapper(valueItem) !== idMapper(removedValueItem),
    );

    onChange(filteredValue.length === 0 ? null : filteredValue);

    if (!open) {
      triggerRef.current?.focus();
    }
  };

  /**
   * Handles clicking on option in combobox list.
   */
  const onSelectOption = (option: TOption) => {
    const mappedValueItem = valueMapper(option);

    if (multiple) {
      onChange(
        [
          ...(value ?? []).filter(
            (valueItem) => idMapper(valueItem) !== option.id,
          ),
          mappedValueItem,
        ],
        option,
      );
    } else {
      onChange(mappedValueItem, option);
    }

    setOpen(false);
  };

  const onReset = props.onReset
    ? () => {
        props.onReset?.();
        triggerRef.current?.focus();
      }
    : undefined;

  const trigger = (
    <ComboboxTrigger
      {...props}
      ref={triggerRef}
      valueLabelMapper={valueLabelMapper}
      idMapper={idMapper}
      aria-expanded={open}
      iconRight={iconRight}
      placeholder={placeholder}
      onReset={onReset}
      {...(multiple
        ? { multiple: true, value, onRemoveValueItem }
        : { multiple: false, value, onRemoveValue })}
    />
  );

  const content = (
    <ComboboxContent
      options={options}
      onSelectOption={onSelectOption}
      idMapper={idMapper}
      optionLabelMapper={optionLabelMapper}
      maxHeight={maxHeight}
      placeholder={placeholder}
      enableSearch={
        enableSearch && hasEnoughOptionsToShowSearchInput(options.length)
      }
      {...(multiple ? { multiple: true, value } : { multiple: false, value })}
    />
  );

  return (
    <ComboboxPopover
      triggerRef={triggerRef}
      maxHeight={maxHeight}
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      content={content}
    />
  );
}
