import { type ReactNode } from "react";

import { FormContent } from "../../../../form/RHF-fields/form-content";
import { useFormContext } from "../../../../form/context/form-context";
import { FormValue } from "../../../../form/form-value";
import { LayoutGroupItem } from "../../layout-group-item";
import { ContentValue } from "../value/content-value";

export type FormContentFieldProps = {
  label: ReactNode;
  name: string;
  readOnly?: boolean;
  accept?: string;
  layoutClassName?: string;
};

export const ACCEPT_ALL = "*/*";
export const ACCEPT_COMMON =
  ".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.7z,.tar,.gz,.mp3,.mp4,.wav,.avi,.mkv,.mov,.flv,.wmv,.svg,.html,.css,.js,.json,.xml,.md";

/**
 * @deprecated use *LayoutField from `iqf-web-ui/form-layout-fields` instead
 */
export function FormContentField({
  label,
  name,
  readOnly = false,
  accept = ACCEPT_ALL,
  layoutClassName,
}: FormContentFieldProps) {
  const { editing } = useFormContext();

  return (
    <LayoutGroupItem label={label} className={layoutClassName}>
      {!editing || readOnly ? (
        <FormValue name={name}>
          {(value) => <ContentValue value={value} />}
        </FormValue>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <FormContent name={name} accept={accept} />
          <FormValue name={name}>
            {(value) => <ContentValue value={value} />}
          </FormValue>
        </div>
      )}
    </LayoutGroupItem>
  );
}
