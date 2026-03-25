import type { Dispatch, PropsWithChildren, SetStateAction } from "react";

import { SidebarProvider } from "iqf-web-ui/shadcn-sidebar";

export type SidebarSettingsProps = {
  sidebarCookieMaxAge?: number;
  sidebarCookieName?: string;
  sidebarKeyboardShortcut?: string;
  sidebarWidth?: string;
  sidebarWidthIcon?: string;
};

export function SidebarWrapper({
  children,
  open,
  setOpen,
  ...props
}: SidebarSettingsProps &
  PropsWithChildren<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }>) {
  return (
    <SidebarProvider {...props} open={open} onOpenChange={setOpen}>
      <div className="flex h-full">{children}</div>
    </SidebarProvider>
  );
}
