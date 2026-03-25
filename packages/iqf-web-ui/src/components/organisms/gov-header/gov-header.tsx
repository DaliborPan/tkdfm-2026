"use client";

import { LogOut, User } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useIntl } from "react-intl";

import { useMeContext } from "../../../security/me/me-context";
import { useSecurityContext } from "../../../security/security-context";
import { useSettingsContext } from "../../../settings/context";
import { Button } from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import { useNavigationContext, useSetNavigationItems } from "./context";
import { GovHeaderNavigationButton } from "./gov-header-navigation-button";
import { GovHeaderNavigationDelimiter } from "./gov-header-navigation-delimiter";
import { GovMobileNavigation } from "./gov-mobile-navigation";
import { GovNavigation } from "./gov-navigation";
import { useCloseOnWidthResize } from "./hooks/use-close-on-width-resize";
import { useIsMobile } from "./hooks/use-is-mobile";
import {
  type PrimaryNavigationType,
  type SecondaryNavigationItemType,
} from "./types";

export type GovHeaderProps = {
  /**
   *  Primary navigation items for header
   */
  primaryNavigation: PrimaryNavigationType;

  /**
   *  Pre navigation items
   *
   * @default displaying logged in user
   */
  preNavigation?: ReactNode;

  /**
   *  Post navigation items
   *
   * @default displaying logout button
   */
  postNavigation?: ReactNode;

  /**
   * `preMobileNavigation` to be displayed in the mobile menu
   *
   * @default displaying logged in user and logout button
   */
  preMobileNavigation?: ReactNode;

  /**
   * Render of mobile navigation
   *
   * @default <GovMobileNavigation />
   */
  mobileNavigation?: (
    openState: [boolean, (open: boolean) => void],
  ) => ReactNode;

  /**
   * Render of secondary navigation
   *
   * @default <GovNavigation items={secondaryItems} />
   */
  secondaryNavigation?: React.ReactNode;
};

/**
 * Default BEFORE primary header navigation - displays logged in user.
 */
function DefaultPreNavigation() {
  const { query } = useMeContext();

  const {
    router: { Link },
  } = useSettingsContext();

  return (
    <>
      <Link href="/profile" className="group flex items-center gap-x-3">
        <div className="flex items-center rounded-full bg-white p-1.5">
          <Icon Icon={User} className="size-5 text-primary" />
        </div>

        <span className="font-medium text-primary-foreground group-hover:underline">
          {query.data?.displayName}
        </span>
      </Link>

      <GovHeaderNavigationDelimiter className="ml-6" />
    </>
  );
}

/**
 * Default AFTER primary header navigation - displays logout button.
 */
function DefaultPostNavigation() {
  const intl = useIntl();

  const { logout } = useSecurityContext();

  return (
    <>
      <GovHeaderNavigationDelimiter />

      <Button
        size="m"
        tooltip={intl.formatMessage({
          id: "navigation.logout",
          defaultMessage: "Odhlásit se",
        })}
        iconLeft={{ Icon: LogOut }}
        onClick={logout}
      />
    </>
  );
}

/**
 * This component displays the gov header. Uses NavigationContext.
 *
 * If navigation items are found in the context, renders secondary navigation as well.
 */
export function GovHeader({
  primaryNavigation,
  preNavigation,
  postNavigation,
  mobileNavigation,
  preMobileNavigation,
  secondaryNavigation,
}: GovHeaderProps) {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);

  const { items, titleItem } = primaryNavigation;
  const { items: secondaryItems } = useNavigationContext();

  void useCloseOnWidthResize(open, setOpen);

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center py-5">
        {titleItem}

        {!isMobile ? (
          <>
            {preNavigation !== undefined ? (
              preNavigation
            ) : (
              <DefaultPreNavigation />
            )}

            {items.length !== 0 && (
              <div className="flex gap-x-0.5">
                {items.map((item) => (
                  <div key={item.href} className="flex items-center">
                    <GovHeaderNavigationButton {...item} />

                    {item.delimiter && <GovHeaderNavigationDelimiter />}
                  </div>
                ))}
              </div>
            )}

            {postNavigation !== undefined ? (
              postNavigation
            ) : (
              <DefaultPostNavigation />
            )}
          </>
        ) : mobileNavigation !== undefined ? (
          mobileNavigation([open, setOpen])
        ) : (
          <GovMobileNavigation
            open={open}
            setOpen={setOpen}
            primaryNavigation={primaryNavigation}
            secondaryItems={secondaryItems}
            preNavigation={preMobileNavigation}
          />
        )}
      </div>

      {secondaryItems &&
        !isMobile &&
        (secondaryNavigation !== undefined ? (
          secondaryNavigation
        ) : (
          <GovNavigation items={secondaryItems} />
        ))}
    </div>
  );
}

/**
 * This component sets props.items to the context. Uses NavigationContext.
 *
 * Items are then displayed via GovHeader component.
 */
export function GovSetHeaderNavigation({
  items,
}: {
  items: SecondaryNavigationItemType[];
}) {
  void useSetNavigationItems({ items });

  return null;
}
