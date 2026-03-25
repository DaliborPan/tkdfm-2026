import { List } from "@radix-ui/react-tabs";
import { useMeasure } from "@uidotdev/usehooks";
import { useMemo, useRef } from "react";

import { cn } from "../../../utils/cn";
import { TabsListDropdown } from "./tabs-list-dropdown";

function useVisibleWidth() {
  const [ref, { width }] = useMeasure();

  return {
    ref,
    width: (width ?? 0) - 24,
  };
}

function useTriggers(listRef: React.RefObject<HTMLDivElement | null>) {
  const children = Array.from(listRef.current?.children ?? []) as HTMLElement[];

  const triggersWidth = useMemo(() => {
    if (!children?.length) return -Infinity;

    const width = children.reduce((acc, child) => acc + child.offsetWidth, 0);

    // gap between tabs = 16px, defined in `List` as `gap-x-4`
    return width + (children.length - 1) * 16;
  }, [children]);

  const triggers = useMemo(
    () =>
      children.map((child) => {
        const id = child.id?.split("-trigger-")[1];

        if (!id) {
          throw new Error(
            "TabsTrigger does not have an id in format of `radix-*-trigger-<value> for some reason",
          );
        }

        return {
          id,
          label: (
            <div className="flex w-full justify-between">
              {Array.from(child.childNodes).map((node) => (
                <span key={node.textContent}>{node.textContent}</span>
              ))}
            </div>
          ),
        };
      }),
    [children],
  );

  return {
    triggersWidth,
    triggers,
  };
}

export type TabsListProps = React.ComponentPropsWithoutRef<typeof List> & {
  wrapperClassName?: string;
  includeMenuButton?: boolean;
};

export function TabsList({
  wrapperClassName,
  className,
  includeMenuButton = false,
  ...props
}: TabsListProps) {
  const { ref, width: visibleWidth } = useVisibleWidth();

  const listRef = useRef<HTMLDivElement | null>(null);
  const { triggersWidth, triggers } = useTriggers(listRef);

  const showMenuButton =
    includeMenuButton && visibleWidth > 0 && visibleWidth < triggersWidth;

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-x-4 border-b", wrapperClassName)}
    >
      <List
        ref={listRef}
        className={cn(
          "no-scrollbar relative flex items-center justify-start gap-x-4 overflow-x-auto",
          className,
        )}
        {...props}
      />

      {showMenuButton && <TabsListDropdown items={triggers} />}
    </div>
  );
}
