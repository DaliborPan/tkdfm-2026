import { Info } from "lucide-react";
import { type PropsWithChildren, type ReactNode } from "react";

import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/icon";
import { Label } from "../../atoms/label";
import { Tooltip } from "../../atoms/tooltip";
import { createFormItemId } from "../form-field";

export type LayoutGroupItemProps = {
  id?: string;
  label?: ReactNode;
  tooltip?: ReactNode;

  required?: boolean;
  className?: string;

  /**
   * @deprecated Pass custom `label` instead
   */
  labelClassName?: string;
};

function LayoutGroupItemContainer({
  id,
  cols,
  className,
  children,
}: PropsWithChildren<{ cols: 1 | 2; className?: string; id?: string }>) {
  return (
    <div
      id={id}
      className={cn(
        "flex items-center gap-x-4 gap-y-2 border-b py-1 last-of-type:border-none",
        {
          ["[&>*]:w-1/2"]: cols === 2,
          ["[&>*]:w-full"]: cols === 1,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LayoutGroupItemLabel({
  label,
  tooltip,
  required,
  id,
  className,
}: Omit<LayoutGroupItemProps, "labelClassName">) {
  return (
    <Label
      htmlFor={id ? createFormItemId(id) : undefined}
      className={cn(
        "flex min-h-8 flex-shrink-0 items-center text-sm text-text-terciary",
        className,
      )}
    >
      {label}

      {required && <span className="ml-1 font-light">*</span>}

      {tooltip && (
        <Tooltip
          Trigger={
            <div className="ml-2.5 flex cursor-help text-text-terciary">
              <Icon Icon={Info} />
            </div>
          }
          position="right"
          Content={<div className="whitespace-pre-line">{tooltip}</div>}
        />
      )}
    </Label>
  );
}

export function LayoutGroupItem({
  id,
  children,
  className,

  label,
  required,
  tooltip,
  labelClassName,
}: PropsWithChildren<LayoutGroupItemProps>) {
  return (
    <LayoutGroupItemContainer
      id={id}
      cols={label ? 2 : 1}
      className={className}
    >
      {typeof label === "string" ? (
        <LayoutGroupItemLabel
          label={label}
          tooltip={tooltip}
          required={required}
          id={id}
          className={labelClassName}
        />
      ) : (
        label
      )}

      {children}
    </LayoutGroupItemContainer>
  );
}
