"use client";

import {
  type CSSProperties,
  type ComponentPropsWithRef,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useMediaQuery } from "usehooks-ts";

import { breakpoints } from "../../../responsivity";
import { usePreferences } from "../../../settings";
import { cn } from "../../../utils";
import {
  SIDEBAR_COOKIE_MAX_AGE as DEFAULT_SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME as DEFAULT_SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT as DEFAULT_SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH as DEFAULT_SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON as DEFAULT_SIDEBAR_WIDTH_ICON,
} from "./const";

export type SidebarContextType = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  sidebarCookieMaxAge = DEFAULT_SIDEBAR_COOKIE_MAX_AGE,
  sidebarCookieName = DEFAULT_SIDEBAR_COOKIE_NAME,
  sidebarKeyboardShortcut = DEFAULT_SIDEBAR_KEYBOARD_SHORTCUT,
  sidebarWidth = DEFAULT_SIDEBAR_WIDTH,
  sidebarWidthIcon = DEFAULT_SIDEBAR_WIDTH_ICON,
  ...props
}: ComponentPropsWithRef<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  sidebarCookieMaxAge?: number;
  sidebarCookieName?: string;
  sidebarKeyboardShortcut?: string;
  sidebarWidth?: string;
  sidebarWidthIcon?: string;
}) {
  const isMobile = useMediaQuery(
    `only screen and (max-width : ${breakpoints.md}px)`,
  );
  const [openMobile, setOpenMobile] = usePreferences({
    defaultValue: false,
    preferenceGroupKey: "sidebar",
    preferenceKey: "openStateMobile",
    version: 1,
  });

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = usePreferences({
    defaultValue: defaultOpen,
    preferenceGroupKey: "sidebar",
    preferenceKey: "openState",
    version: 1,
  });

  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${sidebarCookieName}=${openState}; path=/; max-age=${sidebarCookieMaxAge}`;
    },
    [setOpenProp, open, sidebarCookieName, sidebarCookieMaxAge, _setOpen],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === sidebarKeyboardShortcut &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar, sidebarKeyboardShortcut]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextType>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={
          {
            "--sidebar-width": sidebarWidth,
            "--sidebar-width-icon": sidebarWidthIcon,
            ...style,
          } as CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex h-full w-full max-w-fit flex-1 flex-col has-[[data-variant=inset]]:bg-white",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
