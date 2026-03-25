import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";

import { useSettingsContext } from "../../../settings/context";
import { Icon } from "../../atoms/icon";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadgeInline,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../shadcn-sidebar";
import {
  type MenuSubItemType,
  type PrimaryMenuItemType,
  type SecondaryMenuItemType,
} from "./types";

export function DefaultSidebarMenuItemButtonContent({
  item,
}: {
  item: PrimaryMenuItemType | SecondaryMenuItemType | MenuSubItemType;
}) {
  return (
    <>
      {"icon" in item && item.icon && <Icon {...item.icon} />}

      <span>{item.label}</span>

      {item.badge && (
        <SidebarMenuBadgeInline>{item.badge}</SidebarMenuBadgeInline>
      )}
    </>
  );
}

export function DefaultSidebarMenuItem({
  item,
  isActive,
  className,
  ...props
}: {
  item: PrimaryMenuItemType | SecondaryMenuItemType;
  isActive: boolean;
  className?: string;
  content?: ReactNode;
}) {
  const {
    router: { Link },
  } = useSettingsContext();

  const content = props.content ?? (
    <DefaultSidebarMenuItemButtonContent item={item} />
  );

  return (
    <SidebarMenuItem key={item.label} className={className}>
      <SidebarMenuButton
        tooltip={item.label}
        isActive={isActive}
        {...(item.href && { asChild: true })}
      >
        {item.href ? <Link href={item.href}>{content}</Link> : content}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function SidebarItems({
  items,
  title,
}: {
  items: PrimaryMenuItemType[] | SecondaryMenuItemType[];
  title?: string;
}) {
  const {
    router: { pathname, Link },
  } = useSettingsContext();

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item, index) => {
            if ("item" in item && !!item.item) {
              // eslint-disable-next-line react/no-array-index-key
              return <item.item key={index} />;
            }

            if (item.subItems?.length) {
              return (
                <Collapsible
                  key={item.label}
                  defaultOpen={item.defaultOpen ?? true}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    {item.href ? (
                      <>
                        <SidebarMenuButton
                          asChild={true}
                          tooltip={item.label}
                          isActive={item.isActive?.(pathname) ?? false}
                          className="pr-9"
                        >
                          <Link href={item.href}>
                            <DefaultSidebarMenuItemButtonContent item={item} />
                          </Link>
                        </SidebarMenuButton>

                        <CollapsibleTrigger asChild={true}>
                          <SidebarMenuAction>
                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                      </>
                    ) : (
                      <CollapsibleTrigger asChild={true}>
                        <DefaultSidebarMenuItem
                          item={item}
                          isActive={item.isActive?.(pathname) ?? false}
                          content={
                            <>
                              {item.icon && <Icon {...item.icon} />}

                              <span>{item.label}</span>

                              <div className="ml-auto flex items-center gap-2.5">
                                {item.badge && (
                                  <SidebarMenuBadgeInline>
                                    {item.badge}
                                  </SidebarMenuBadgeInline>
                                )}

                                <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              </div>
                            </>
                          }
                        />
                      </CollapsibleTrigger>
                    )}

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem, index) => {
                          if ("item" in subItem && !!subItem.item) {
                            // eslint-disable-next-line react/no-array-index-key
                            return <subItem.item key={index} />;
                          }

                          return (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton
                                asChild={true}
                                isActive={subItem.isActive?.(pathname) ?? false}
                              >
                                <Link href={subItem.href}>
                                  <DefaultSidebarMenuItemButtonContent
                                    item={subItem}
                                  />
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <DefaultSidebarMenuItem
                key={item.label}
                item={item}
                isActive={item.isActive?.(pathname) ?? false}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
