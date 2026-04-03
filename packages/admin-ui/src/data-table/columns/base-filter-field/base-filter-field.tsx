import { type ComponentProps } from "react";

import { Popover } from "iqf-web-ui/popover";

import { type FilterComponentProps } from "../../types";
import { FilterFieldContent } from "./filter-field-content";
import { FilterFieldTrigger } from "./filter-field-trigger";

export function BaseFilterField({
  content,
  ...props
}: Partial<FilterComponentProps> & {
  content: ComponentProps<typeof FilterFieldContent>["children"];
}) {
  return (
    <Popover
      className="w-full border bg-white p-0 shadow-lg [&_svg]:fill-none"
      trigger={<FilterFieldTrigger {...props} />}
      content={
        <FilterFieldContent {...props}>
          {(filterContentParams) => content(filterContentParams)}
        </FilterFieldContent>
      }
    />
  );
}
