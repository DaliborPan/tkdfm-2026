import { Check } from "lucide-react";
import { Activity, type ComponentRef, type Ref } from "react";
import { defineMessage, useIntl } from "react-intl";

import { cn } from "../../../../utils/cn";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../atoms/command";
import { Icon } from "../../../atoms/icon";
import {
  type ComboboxBaseOptionType,
  type ComboboxContentProps,
} from "../types";
import { defaultIdMapper, defaultOptionLabelMapper } from "../utils";

export const DEFAULT_MAX_HEIGHT = 225;

type OptionRowProps<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
> = Required<
  Pick<
    ComboboxContentProps<TValueItem, TOption>,
    "onSelectOption" | "value" | "idMapper" | "optionLabelMapper"
  >
> & { option: TOption; style?: React.CSSProperties; "data-index"?: number };

function OptionRow<TValueItem, TOption extends ComboboxBaseOptionType>({
  option,
  onSelectOption,
  value,
  idMapper,
  optionLabelMapper,
  ...props
}: OptionRowProps<TValueItem, TOption> & { ref?: Ref<HTMLDivElement> }) {
  const isOptionSelected = (
    !value ? [] : Array.isArray(value) ? value : [value]
  ).some((valueItem) => idMapper(valueItem) === option.id);

  return (
    <CommandItem
      {...props}
      value={option.id}
      disabled={option.disabled}
      onSelect={() => onSelectOption(option)}
      className={cn(isOptionSelected && "hover:bg-primary-100")}
    >
      <span
        className={cn(
          "block overflow-hidden text-wrap",
          isOptionSelected && "mr-6",
        )}
        title={optionLabelMapper(option)}
      >
        {optionLabelMapper(option)}
      </span>

      {isOptionSelected && (
        <Icon
          Icon={Check}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        />
      )}
    </CommandItem>
  );
}

export function ComboboxContent<
  TValueItem,
  TOption extends ComboboxBaseOptionType,
>({
  options,
  rowVirtualizer,
  onInput,
  isFetching,
  maxHeight = DEFAULT_MAX_HEIGHT,
  placeholder,
  enableSearch = true,
  minQueryLength,
  optionLabelMapper = defaultOptionLabelMapper,
  idMapper = defaultIdMapper,
  ref,
  ...props
}: ComboboxContentProps<TValueItem, TOption> & {
  ref?: Ref<ComponentRef<typeof CommandList>>;
}) {
  const intl = useIntl();

  const shouldFilterClientSide = !onInput;

  const isFetchingMessage = intl.formatMessage({
    id: "molecules.combobox.isFetching",
    defaultMessage: "Načítání...",
  });

  const commandEmptyMessage = minQueryLength
    ? intl.formatMessage(
        defineMessage({
          id: "molecules.combobox.min-query-length-message",
          defaultMessage: "Minimální počet znaků je {minQueryLength}.",
        }),
        { minQueryLength },
      )
    : isFetching
      ? isFetchingMessage
      : intl.formatMessage({
          id: "molecules.combobox.no-data",
          defaultMessage: "Žádná data",
        });

  const optionsRows = rowVirtualizer ? (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const option = options[virtualItem.index];

        const virtualItemStyle = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${virtualItem.start}px)`,
        } as const;

        if (!option) {
          return (
            isFetching && (
              <span
                key="fetching-next-page"
                title={isFetchingMessage}
                className="truncate px-2 py-1.5"
                style={{ ...virtualItemStyle, height: `${virtualItem.size}px` }}
              >
                {isFetchingMessage}
              </span>
            )
          );
        }

        return (
          <OptionRow
            {...props}
            key={option.id}
            data-index={virtualItem.index}
            ref={rowVirtualizer.measureElement}
            option={option}
            optionLabelMapper={optionLabelMapper}
            idMapper={idMapper}
            style={virtualItemStyle}
          />
        );
      })}
    </div>
  ) : (
    <>
      {options.map((option) => (
        <OptionRow
          {...props}
          key={option.id}
          option={option}
          optionLabelMapper={optionLabelMapper}
          idMapper={idMapper}
        />
      ))}
    </>
  );

  return (
    <Command
      className="w-[var(--radix-popover-trigger-width)] focus:outline-none"
      shouldFilter={shouldFilterClientSide}
      style={{ maxHeight }}
      tabIndex={0}
      filter={(value, search) => {
        const searchOption = options.find(
          (o) =>
            optionLabelMapper(o).toLowerCase().includes(search.toLowerCase()) &&
            value.includes(o.id),
        );

        return searchOption ? 1 : 0;
      }}
    >
      <Activity mode={enableSearch ? "visible" : "hidden"}>
        <CommandInput
          ref={(el) => {
            el?.focus();
          }}
          placeholder={placeholder}
          onInput={onInput}
        />
      </Activity>

      <CommandList ref={ref}>
        <CommandEmpty className="truncate" title={commandEmptyMessage}>
          {commandEmptyMessage}
        </CommandEmpty>

        <Activity mode={options.length > 0 ? "visible" : "hidden"}>
          <CommandGroup>{optionsRows}</CommandGroup>
        </Activity>
      </CommandList>
    </Command>
  );
}
