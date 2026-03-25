import { type Ref } from "react";
import { defineMessage, useIntl } from "react-intl";

import { useSettingsContext } from "../../../../settings/context";
import { cn } from "../../../../utils/cn";
import { type ComboboxTriggerProps } from "../types";
import { defaultIdMapper } from "../utils";
import { ComboboxButton } from "./combobox-button";
import { ComboboxButtonValue } from "./combobox-button-value";
import { ComboboxIcons } from "./combobox-icons";
import { ComboboxRemoveItemButton } from "./combobox-remove-item-button";
import { ComboboxResetButton } from "./combobox-reset-button";
import { ComboboxTriggerListItem } from "./combobox-trigger-list-item";

export function ComboboxTrigger<TValueItem>({
  valueLabelMapper,
  idMapper = defaultIdMapper,
  multiple,
  value,
  onRemoveValue,
  onRemoveValueItem,
  disabled,
  iconRight,
  placeholder,
  showClearButton = true,
  size = "s",
  color = "secondary",
  variant = "outlined",
  onReset,
  readOnly = false,
  ...props
}: ComboboxTriggerProps<TValueItem> & { ref?: Ref<HTMLButtonElement> }) {
  const intl = useIntl();
  const { form } = useSettingsContext();

  const isResetEnabled = !!form?.fields?.enableReset;
  const canRenderReset = isResetEnabled && onReset && !disabled && !readOnly;

  const getRemoveItemLabel = (valueLabel: string | null) =>
    intl.formatMessage(
      defineMessage({
        id: "combobox.remove-item.label",
        defaultMessage: "Odebrat {valueLabel}",
      }),
      { valueLabel },
    );

  const renderValue = () => {
    if (multiple) {
      return (
        <>
          {!value || value.length === 0 ? (
            <ComboboxButtonValue className="text-secondary-600">
              {placeholder}
            </ComboboxButtonValue>
          ) : (
            <ul
              className={cn(
                "flex flex-1 flex-wrap gap-1 overflow-hidden",
                disabled && "opacity-50",
              )}
            >
              {value.map((valueItem) => (
                <ComboboxTriggerListItem
                  key={idMapper(valueItem)}
                  label={valueLabelMapper(valueItem) ?? ""}
                  size={size}
                  disabled={disabled}
                  readOnly={readOnly}
                  onRemove={() => {
                    onRemoveValueItem(valueItem);
                  }}
                />
              ))}
            </ul>
          )}

          <ComboboxIcons iconRight={iconRight} size={size}>
            {canRenderReset && (
              <ComboboxResetButton onClick={onReset} size={size} />
            )}
          </ComboboxIcons>
        </>
      );
    }

    const valueLabel = valueLabelMapper(value);

    return (
      <>
        <ComboboxButtonValue
          className={cn(!valueLabel && "text-secondary-600")}
          {...(valueLabel && { title: valueLabel })}
        >
          {valueLabel || placeholder}
        </ComboboxButtonValue>

        <ComboboxIcons iconRight={iconRight} size={size}>
          {showClearButton && value && !disabled && !readOnly && (
            <ComboboxRemoveItemButton
              aria-label={getRemoveItemLabel(valueLabel)}
              onClick={onRemoveValue}
              size={size}
            />
          )}

          {canRenderReset && (
            <ComboboxResetButton onClick={onReset} size={size} />
          )}
        </ComboboxIcons>
      </>
    );
  };

  return (
    <ComboboxButton
      {...props}
      role="combobox"
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      multiple={multiple}
    >
      {renderValue()}
    </ComboboxButton>
  );
}
