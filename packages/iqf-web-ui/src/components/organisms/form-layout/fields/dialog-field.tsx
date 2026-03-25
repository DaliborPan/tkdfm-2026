import { type PropsWithChildren, type ReactNode } from "react";

import { cn } from "../../../../utils";
import { AtomMessage } from "../../../atoms/atom-message";
import { type IconProps } from "../../../atoms/icon/types";
import { Alert } from "../../../molecules/alert";
import { type DialogSize } from "../../../molecules/dialog/types";
import { LayoutGroupItem } from "../layout-group-item";
import { ChipValue } from "./value/chip-value";

export type DialogFieldProps = {
  label: string;
  title?: string;
  textValue: string;
  icon?: IconProps;
  className?: string;
  size?: DialogSize;
  actions?: ReactNode;
  cancel?: ReactNode;
  error?: ReactNode;
};

export function DialogField({
  label,
  title = label,
  textValue,
  children,
  icon,
  className,
  size = "2xl",
  actions,
  cancel,
  error,
}: PropsWithChildren<DialogFieldProps>) {
  return (
    <LayoutGroupItem label={label} className={cn({ ["px-0"]: !label })}>
      <div className="flex flex-col">
        <div className="flex w-full flex-shrink-0 justify-between">
          <Alert
            title={title}
            dialogProps={{ size }}
            content={<div className="flex flex-col gap-3">{children}</div>}
            cancel={cancel}
          >
            <ChipValue
              as="button"
              icon={icon}
              value={textValue}
              className="truncate"
              textClassName={className}
            />
          </Alert>
          {actions}
        </div>

        {error && <AtomMessage text={error} state="error" />}
      </div>
    </LayoutGroupItem>
  );
}
