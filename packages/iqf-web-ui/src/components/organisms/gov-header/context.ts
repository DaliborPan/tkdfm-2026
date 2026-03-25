"use client";

import isEqualWith from "lodash/isEqualWith";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
} from "react";

import { type SecondaryNavigationItemType } from "./types";

export type NavigationContextType = {
  items?: SecondaryNavigationItemType[];
  setItems: Dispatch<SetStateAction<SecondaryNavigationItemType[] | undefined>>;
};

export const NavigationContext = createContext<NavigationContextType | null>(
  null,
);

export function useNavigationContext() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider.",
    );
  }

  return context;
}

export function useSetNavigationItems({
  items,
}: {
  items?: SecondaryNavigationItemType[];
}) {
  const { setItems } = useNavigationContext();

  useLayoutEffect(() => {
    setItems((prev) => {
      const next = items;

      return !isEqualWith(prev, next, (objValue, othValue) => {
        if (typeof objValue === "function" && typeof othValue === "function") {
          return true;
        }
        return undefined;
      })
        ? next
        : prev;
    });
  }, [items, setItems]);

  useLayoutEffect(() => {
    return () => {
      setItems(undefined);
    };
  }, [setItems]);
}
