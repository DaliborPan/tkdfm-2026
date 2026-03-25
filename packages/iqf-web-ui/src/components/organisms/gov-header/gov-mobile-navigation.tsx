"use client";

import { Slot } from "@radix-ui/react-slot";
import { LogOut, User } from "lucide-react";
import { type PropsWithChildren, type ReactNode, forwardRef } from "react";
import { useIntl } from "react-intl";

import { useMeContext } from "../../../security/me";
import { useSecurityContext } from "../../../security/security-context";
import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";
import { Button, type ButtonElementProps } from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../shadcn-sidebar";
import { GovHeaderNavigationDelimiter } from "./gov-header-navigation-delimiter";
import type {
  PrimaryNavigationItemType,
  PrimaryNavigationType,
  SecondaryNavigationItemType,
} from "./types";

type MobileNavigationProps = {
  /**
   * Primary navigation items
   */
  primaryNavigation: PrimaryNavigationType;

  /**
   * `open` state of the mobile menu
   */
  open: boolean;

  /**
   * Function to set the `open` state of the mobile menu
   */
  setOpen: (open: boolean) => void;

  /**
   * @returns default component for pre navigation, which is logged in user
   * and logout button
   */
  preNavigation?: ReactNode;

  /**
   * Width of the mobile menu
   * @default 360
   */
  menuWidth?: number;

  /**
   * Secondary navigation items
   */
  secondaryItems?: SecondaryNavigationItemType[];
};

export const GovMobileMenuTrigger = forwardRef<
  HTMLButtonElement,
  ButtonElementProps & {
    open?: boolean;
  }
>(function GovMobileMenuTrigger(
  { open, size = "m", className, children = "MENU", ...props },
  ref,
) {
  return (
    <Button
      size={size}
      className={cn(
        "group flex h-fit items-center gap-x-2 font-medium",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}

      <div className="mb-1 flex flex-col items-start gap-y-1.5">
        <div
          className={cn(
            "h-0.5 w-[18px] rounded-full bg-primary-foreground transition-all",
            open && "translate-y-[5px] rotate-45",
          )}
        />

        <div
          className={cn(
            "h-0.5 w-3 rounded-full bg-primary-foreground transition-all",
            open && "w-[18px] -translate-y-[5px] -rotate-45",
          )}
        />
      </div>
    </Button>
  );
});

function SecondaryNavItemChildren({
  item: { useShouldShowQuery, ...item },
}: {
  item: SecondaryNavigationItemType;
}) {
  const query = useShouldShowQuery?.();

  if (query && !query?.data) {
    return null;
  }

  return item.label;
}

function PrimaryNavItemChildren({ item }: { item: PrimaryNavigationItemType }) {
  return (
    <>
      {item.Icon && <Icon Icon={item.Icon} />}

      <span className="truncate">{item.label}</span>
    </>
  );
}

export function GovMobileNavigationItem({
  href,
  className,
  onClick,
  children,
}: PropsWithChildren<{
  href: string;
  className?: string;
  onClick?: () => void;
}>) {
  const {
    router: { Link },
  } = useSettingsContext();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 px-5 py-3 text-sm font-medium uppercase hover:underline",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

/**
 * @returns default component for mobile header
 */
function DefaultPreNavigation() {
  const intl = useIntl();

  const {
    router: { Link },
  } = useSettingsContext();

  const { query } = useMeContext();
  const { logout } = useSecurityContext();

  return (
    <div className="my-5 flex items-center justify-between gap-5 px-5">
      <Link
        href="/profile"
        className="group flex items-center gap-x-3 overflow-hidden"
      >
        <div className="flex items-center rounded-full bg-white p-1.5">
          <Icon Icon={User} className="size-5 text-primary" />
        </div>
        <span className="truncate font-medium text-primary-foreground group-hover:underline">
          {query.data?.displayName}
        </span>
      </Link>

      <Button
        variant="outlined"
        size="m"
        iconLeft={{ Icon: LogOut }}
        onClick={logout}
        className="border-inherit text-inherit hover:bg-primary-700"
      >
        {intl.formatMessage({
          id: "navigation.logout",
          defaultMessage: "Odhlásit se",
        })}
      </Button>
    </div>
  );
}

export function GovMobileNavigationSheetContent({
  primaryNavigation,
  secondaryItems,
  setOpen,
  preNavigation,
  closeButton,
}: Pick<
  MobileNavigationProps,
  "secondaryItems" | "setOpen" | "preNavigation"
> & {
  closeButton?: ReactNode;
  primaryNavigation?: MobileNavigationProps["primaryNavigation"];
}) {
  return (
    <>
      <div className="flex items-center justify-between p-5">
        {primaryNavigation && (
          <Slot onClick={() => setOpen(false)}>
            {primaryNavigation.titleItem}
          </Slot>
        )}

        <SheetClose asChild={true}>{closeButton}</SheetClose>
      </div>

      {preNavigation !== undefined ? preNavigation : <DefaultPreNavigation />}

      {!!primaryNavigation?.items.length && (
        <div className="my-5">
          {primaryNavigation?.items.map((item) => (
            <GovMobileNavigationItem
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <PrimaryNavItemChildren item={item} />
            </GovMobileNavigationItem>
          ))}
        </div>
      )}

      {!!secondaryItems?.length && (
        <>
          <div className="px-5">
            <GovHeaderNavigationDelimiter className="m-auto h-px w-full" />
          </div>

          <div className="my-5">
            {secondaryItems.map((item) => (
              <GovMobileNavigationItem
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <SecondaryNavItemChildren item={item} />
              </GovMobileNavigationItem>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export function GovMobileNavigationSheet({
  children,
  open,
  setOpen,
  contentClassName,
  content,
  menuWidth = 360,
}: PropsWithChildren<
  Pick<MobileNavigationProps, "open" | "setOpen" | "menuWidth"> & {
    content: React.ReactNode;
    contentClassName?: string;
  }
>) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild={true}>{children}</SheetTrigger>

      <SheetContent
        side="left"
        className={cn(
          "max-w-full border-none bg-primary p-0 text-primary-foreground",
          contentClassName,
        )}
        style={{ width: menuWidth }}
        overlayClassName="bg-black bg-opacity-50 backdrop-blur-[2px]"
        showCloseButton={false}
      >
        {content}
      </SheetContent>
    </Sheet>
  );
}

export function GovMobileNavigation({
  primaryNavigation,
  secondaryItems,
  open,
  setOpen,
  preNavigation,
  menuWidth = 360,
}: MobileNavigationProps) {
  return (
    <GovMobileNavigationSheet
      open={open}
      setOpen={setOpen}
      menuWidth={menuWidth}
      content={
        <GovMobileNavigationSheetContent
          primaryNavigation={primaryNavigation}
          secondaryItems={secondaryItems}
          setOpen={setOpen}
          preNavigation={preNavigation}
          closeButton={<GovMobileMenuTrigger open={open} />}
        />
      }
    >
      <GovMobileMenuTrigger open={open} />
    </GovMobileNavigationSheet>
  );
}
