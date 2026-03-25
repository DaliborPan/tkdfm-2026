import { CircleArrowDown } from "lucide-react";
import { Fragment } from "react";

import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../molecules/dropdown-menu";
import { useFormTabsContext } from "./form-tabs-context";

type FormTabsListDropdownProps = {
  items: { id: string; label: React.ReactNode }[];
};

export function FormTabsListDropdown({ items }: FormTabsListDropdownProps) {
  const { value, onValueChange } = useFormTabsContext();

  return (
    <div>
      <DropdownMenu variant="primary">
        <DropdownMenuTrigger className="flex items-center border-l px-[15.5px] py-[18.5px] text-primary transition-all hover:bg-primary-100">
          <Icon Icon={CircleArrowDown} />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {items.map(({ id, label }, i) => (
            <Fragment key={id}>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer text-sm font-bold",
                  value === id && "bg-primary-100",
                )}
                onClick={() => onValueChange(id)}
              >
                {label}
              </DropdownMenuItem>

              {i < items.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
