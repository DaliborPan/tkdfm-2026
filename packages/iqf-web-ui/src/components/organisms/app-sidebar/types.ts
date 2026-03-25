import { type ReactNode } from "react";

import { type IconProps } from "../../atoms/icon/types";

/**
 * Custom item to be rendered in the sidebar.
 *
 * You should follow the shadcn/ui Sidebar API and conventions.
 */
type CustomItemNodeType = () => ReactNode;

type RegularSubItemType = {
  label: string;
  href: string;
  isActive?: (href?: string) => boolean;
  badge?: string;

  item?: never;
};

type CustomSubItemType = {
  label?: never;
  href?: never;
  isActive?: never;
  badge?: never;

  item: CustomItemNodeType;
};

export type MenuSubItemType = RegularSubItemType | CustomSubItemType;

type RegularMenuItemType = {
  label: string;
  href?: string;
  icon?: IconProps;
  isActive?: (href?: string) => boolean;
  badge?: string;
  subItems?: MenuSubItemType[];

  /**
   * If this item is collapsible (has subItems), decide if
   * the collapsible should be open by default.
   *
   * @default true
   */
  defaultOpen?: boolean;

  item?: never;
};

type CustomMenuItemType = {
  label?: never;
  href?: never;
  icon?: never;
  isActive?: never;
  badge?: never;
  subItems?: never;
  defaultOpen?: never;
  item: CustomItemNodeType;
};

export type PrimaryMenuItemType = {
  align?: "top" | "bottom";
} & (RegularMenuItemType | CustomMenuItemType);

export type SecondaryMenuItemType = RegularMenuItemType | CustomMenuItemType;

export type SecondaryMenuPropsType = {
  header?: () => ReactNode;
  footer?: () => ReactNode;
} & (
  | {
      items: SecondaryMenuItemType[];
      title?: string;
      content?: never;
    }
  | {
      items?: never;
      title?: never;
      content: () => ReactNode;
    }
);
