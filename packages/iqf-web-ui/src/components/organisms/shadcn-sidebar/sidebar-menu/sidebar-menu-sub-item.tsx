"use client";

import { type ComponentPropsWithRef } from "react";

export function SidebarMenuSubItem(props: ComponentPropsWithRef<"li">) {
  return <li className="before:hidden" {...props} />;
}
