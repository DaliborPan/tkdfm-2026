import { isEmpty } from "lodash";
import { type PropsWithChildren, type ReactNode } from "react";

import { cn } from "../../../utils";

export type LayoutGroupProps = {
  title?: ReactNode;
  className?: string;
  actions?: ReactNode;
};

/**
 * @deprecated use LayoutGroup from iqf-web-ui/form
 */
export function LayoutGroup({
  title,
  className,
  children,
  actions,
}: PropsWithChildren<LayoutGroupProps>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border [&_>_div]:px-4",
        className,
      )}
    >
      {(!isEmpty(title) || actions !== undefined) && (
        <div className="flex items-center rounded-t-lg border-b bg-secondary-200 px-4 py-1">
          <div className="grow text-sm font-bold leading-8">{title}</div>

          <div className="flex items-center">{actions}</div>
        </div>
      )}
      {children}
    </div>
  );
}
