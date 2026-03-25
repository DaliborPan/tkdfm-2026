import { Check } from "lucide-react";

import { type BaseObject } from "../../../evidence/base";
import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/icon";

type AutocompleteOptionProps<ItemType extends BaseObject> = {
  option: ItemType;
  selected: boolean;
  focused: boolean;
  handleSelect: (option: ItemType) => void;
  labelMapper: (option: ItemType) => string;
  style?: React.CSSProperties;
};

export function AutocompleteOption<ItemType extends BaseObject>({
  option,
  selected,
  focused,
  handleSelect,
  labelMapper,
  style,
}: AutocompleteOptionProps<ItemType>) {
  if (!option) {
    /**
     * Event though `option` is typed as `ItemType`, it can be `undefined` in some cases (for unknown reason).
     * It causes then a runtime error when trying to access `option.id`.
     */
    return null;
  }

  return (
    <li
      style={style}
      className="mb-0 max-w-full list-none before:hidden"
      key={option.id}
    >
      <button
        title={labelMapper(option)}
        className={cn(
          "flex w-full items-center px-[0.4375rem] py-[0.75rem] text-left hover:bg-primary-100",
          {
            "bg-primary-100": focused,
          },
        )}
        onClick={() => handleSelect(option)}
      >
        {selected ? (
          <Icon
            Icon={Check}
            className="mr-[0.4375rem] flex-shrink-0 !fill-none text-primary-500"
          />
        ) : (
          <span className="mr-[0.4375rem] w-[1rem] flex-shrink-0" />
        )}
        <span className="w-full truncate">{labelMapper(option)}</span>
      </button>
    </li>
  );
}
