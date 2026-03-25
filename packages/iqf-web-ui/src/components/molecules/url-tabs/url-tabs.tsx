import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { cn } from "../../../utils/cn";
import {
  Tabs,
  TabsList,
  type TabsProps,
  TabsTrigger,
  type TabsTriggerProps,
} from "../tabs";

export type UrlTabsProps<TValueType extends string = string> = Omit<
  TabsProps,
  "value" | "onValueChange" | "defaultValue"
> & {
  triggers: {
    value: TValueType;
    label: React.ReactNode;
    hidden?: boolean;
    chip?: TabsTriggerProps["chip"];
  }[];
  defaultValue: NoInfer<TValueType>;
  tabsListProps?: React.ComponentPropsWithoutRef<typeof TabsList>;
};

export function UrlTabs<TValueType extends string = string>({
  triggers,
  defaultValue,
  tabsListProps,
  children,
  ...props
}: UrlTabsProps<TValueType>) {
  const location = useLocation();
  const navigate = useNavigate();

  const visibleTriggers = triggers.filter((t) => !t.hidden);
  const currentHash = location.hash.replace("#", "");
  const isValidHash = visibleTriggers.some((t) => t.value === currentHash);
  const activeTab =
    currentHash && isValidHash ? (currentHash as TValueType) : defaultValue;

  /**
   * It's possible that URL contains has, that is not present in
   * visibleTriggers, therefore we need to redirect to the first visible tab.
   *
   * Example situation: User clicks on "Edit detail", that leads
   * to change of visibleTriggers.
   */
  useEffect(() => {
    if (currentHash && (!isValidHash || currentHash === defaultValue)) {
      navigate(
        { pathname: location.pathname, search: location.search },
        { replace: true },
      );
    }
  }, [
    currentHash,
    defaultValue,
    isValidHash,
    navigate,
    location.pathname,
    location.search,
  ]);

  const onValueChange = (newValue: string) => {
    if (newValue === defaultValue) {
      navigate(
        { pathname: location.pathname, search: location.search },
        { replace: true },
      );
    } else {
      navigate({ hash: newValue }, { replace: true });
    }
  };

  return (
    <Tabs
      {...props}
      value={activeTab}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <TabsList
        {...tabsListProps}
        includeMenuButton={tabsListProps?.includeMenuButton ?? true}
        className={cn("px-4", tabsListProps?.className)}
      >
        {visibleTriggers.map((trigger) => (
          <TabsTrigger
            key={trigger.value}
            value={trigger.value}
            chip={trigger.chip}
          >
            {trigger.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
}
