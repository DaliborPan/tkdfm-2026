"use client";

import { type ReactNode, useMemo, useState } from "react";

import { NavigationContext } from "./context";
import { type SecondaryNavigationItemType } from "./types";

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SecondaryNavigationItemType[] | undefined>(
    undefined,
  );

  const contextValue = useMemo(() => ({ items, setItems }), [items]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}
