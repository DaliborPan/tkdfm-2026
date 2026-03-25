import { Root } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenuContextProvider,
  type DropdownMenuVariant,
} from "./dropdown-menu-context";

type DropdownMenuProps = React.ComponentProps<typeof Root> & {
  variant?: DropdownMenuVariant;
};

export function DropdownMenu({
  variant = "default",
  ...props
}: DropdownMenuProps) {
  return (
    <DropdownMenuContextProvider variant={variant}>
      <Root {...props} />
    </DropdownMenuContextProvider>
  );
}

/**
 * @deprecated
 *
 * use `DropdownMenu` instead
 */
export const Dropdown = DropdownMenu;
