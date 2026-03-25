import { type PropsWithChildren, type ReactNode } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../../molecules/context-menu";

export function DataTableContextMenu<TData>({
  actions,
  focusedRow,
  children,
}: PropsWithChildren<{
  actions?: ReactNode | ((focusedRow: TData) => ReactNode);
  focusedRow: TData;
}>) {
  if (!actions) {
    return <>{children}</>;
  }

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild={true}>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-80">
        {typeof actions === "function" ? actions(focusedRow) : actions}
      </ContextMenuContent>
    </ContextMenu>
  );
}
