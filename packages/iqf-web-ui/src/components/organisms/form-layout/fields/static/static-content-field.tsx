import { type ReactNode } from "react";

import { LayoutGroupItem } from "../../layout-group-item";
import { ContentValue, type ContentValueProps } from "../value/content-value";

export type StaticContentFieldProps = {
  label: ReactNode;
} & ContentValueProps;

/**
 * @deprecated use *LayoutValue from `iqf-web-ui/form-layout-values` instead
 */
export function StaticContentField({
  label,
  ...props
}: StaticContentFieldProps) {
  return (
    <LayoutGroupItem label={label}>
      <ContentValue {...props} />
    </LayoutGroupItem>
  );
}
