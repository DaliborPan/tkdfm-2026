import { defineMessage, useIntl } from "react-intl";

import { comboboxMultipleItemVariants } from "../const";
import { type ComboboxTriggerProps } from "../types";
import { ComboboxButtonValue } from "./combobox-button-value";
import { ComboboxRemoveItemButton } from "./combobox-remove-item-button";

export function ComboboxTriggerListItem({
  label,
  size,
  disabled,
  readOnly,
  onRemove,
}: Pick<ComboboxTriggerProps, "size" | "disabled" | "readOnly"> & {
  label: string;
  onRemove: () => void;
}) {
  const intl = useIntl();

  const getRemoveItemLabel = (valueLabel: string | null) =>
    intl.formatMessage(
      defineMessage({
        id: "combobox.remove-item.label",
        defaultMessage: "Odebrat {valueLabel}",
      }),
      { valueLabel },
    );

  return (
    <li className="min-h-[1lh] overflow-hidden rounded-md bg-primary-100 px-2 font-normal text-text-primary">
      <div className="flex h-full w-full items-center gap-2">
        <ComboboxButtonValue className={comboboxMultipleItemVariants({ size })}>
          {label}
        </ComboboxButtonValue>

        {!disabled && !readOnly && (
          <ComboboxRemoveItemButton
            aria-label={getRemoveItemLabel(label)}
            onClick={() => {
              onRemove();
            }}
            className="flex items-center justify-center opacity-100"
          />
        )}
      </div>
    </li>
  );
}
