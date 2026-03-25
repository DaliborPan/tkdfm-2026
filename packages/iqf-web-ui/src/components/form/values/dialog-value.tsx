import { type PropsWithChildren, type ReactNode } from "react";

import { AtomMessage } from "../../atoms/atom-message";
import { type IconProps } from "../../atoms/icon";
import { Alert } from "../../molecules/alert";
import { type DialogSize } from "../../molecules/dialog";
import { ChipValue } from "./chip-value";

export type DialogValueProps = {
  title?: ReactNode;
  textValue: string;
  icon?: IconProps;
  className?: string;
  size?: DialogSize;
  actions?: React.ReactNode;
  cancel?: React.ReactNode;
  error?: React.ReactNode;
};

export function DialogValue({
  title,
  textValue,
  children,
  icon,
  className,
  size = "2xl",
  actions,
  cancel,
  error,
}: PropsWithChildren<DialogValueProps>) {
  return (
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
  );
}
