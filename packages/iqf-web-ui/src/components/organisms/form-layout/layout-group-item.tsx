import { Info } from "lucide-react";
import { type PropsWithChildren, type ReactNode } from "react";

import { cn } from "../../../utils";
import { Icon } from "../../atoms/icon";
import { Label } from "../../atoms/label";
import { Tooltip } from "../../atoms/tooltip";
import { createFormItemId } from "../../form/form-field";

export type LayoutGroupItemProps = {
  id?: string;
  label?: ReactNode;
  tooltip?: ReactNode;
  className?: string;
  labelClassName?: string;
};

/**
 * @deprecated use LayoutGroupItem from iqf-web-ui/form
 */
export function LayoutGroupItem({
  id,
  children,
  label,
  tooltip,
  className,
  labelClassName,
}: PropsWithChildren<LayoutGroupItemProps>) {
  return (
    <LayoutGroupItemContainer
      id={id}
      cols={label ? 2 : 1}
      className={className}
    >
      {label && (
        <Label
          htmlFor={id ? createFormItemId(id) : undefined}
          className={cn(
            "flex flex-shrink-0 items-center text-sm text-neutral-500",
            labelClassName,
          )}
        >
          {label}

          {tooltip && (
            <Tooltip
              Trigger={
                <div className="ml-4 flex cursor-help text-neutral-500">
                  <Icon Icon={Info} />
                </div>
              }
              position="right"
              Content={<div className="whitespace-pre-line">{tooltip}</div>}
            />
          )}
        </Label>
      )}

      {children}
    </LayoutGroupItemContainer>
  );
}

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
