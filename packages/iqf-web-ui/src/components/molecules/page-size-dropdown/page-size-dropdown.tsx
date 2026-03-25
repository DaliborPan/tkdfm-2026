import { type PaginationState } from "@tanstack/react-table";
import { FormattedMessage } from "react-intl";

import { Button } from "../../atoms/button";
import { Chip } from "../../atoms/chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

const PAGE_SIZES = [10, 25, 50, 75, 100];

type PageSizeDropdownProps = {
  pagination: PaginationState;
  onChange: (pageSize: number) => void;
};

export function PageSizeDropdown({
  pagination,
  onChange,
}: PageSizeDropdownProps) {
  return (
    <DropdownMenu variant="primary">
      <DropdownMenuTrigger asChild={true}>
        <Button variant="base">
          <FormattedMessage
            id="data-table.page-size"
            defaultMessage="Počet záznamů na stránku: "
          />
          <Chip variant="primary" size="xs" inverse={true} className="ml-2">
            <div>{pagination.pageSize}</div>
          </Chip>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={pagination.pageSize.toString()}
          onValueChange={(value) => onChange(+value)}
        >
          {PAGE_SIZES.map((pageSize) => (
            <DropdownMenuRadioItem key={pageSize} value={pageSize.toString()}>
              {pageSize}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
