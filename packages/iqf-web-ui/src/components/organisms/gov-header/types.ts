import { type UseQueryResult } from "@tanstack/react-query";
import { type ReactNode } from "react";

import { type IqfAxiosError } from "../../../utils/api-fetch";
import { type IconProps } from "../../atoms/icon";

export type PrimaryNavigationType = {
  /**
   * Title item of gov header.
   */
  titleItem: ReactNode;

  /**
   * Primary navigation items of gov header.
   */
  items: PrimaryNavigationItemType[];
};

/**
 * Primary navigation item type.
 * Used for items in primary navigation of gov header.
 */
export type PrimaryNavigationItemType = {
  /**
   * URL to navigate to.
   */
  href: string;

  /**
   * Item icon.
   */
  Icon: IconProps["Icon"];

  /**
   * Item tooltip.
   */
  tooltip?: string;

  /**
   * Item label.
   */
  label?: string;

  /**
   * Optional vertical delimiter.
   * This is used to separate items in the navigation.
   * If true, a vertical line will be displayed between this item and the next one.
   */
  delimiter?: boolean;
};

/**
 * Secondary navigation item type.
 * Used for items in secondary navigation of gov header.
 */
export type SecondaryNavigationItemType = {
  /**
   * URL to navigate to.
   */
  href: string;

  /**
   * Item label.
   */
  label: string;

  /**
   * Query that determines if the item should be shown.
   */
  useShouldShowQuery?: () => UseQueryResult<boolean, Error | IqfAxiosError>;
};
