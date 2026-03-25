import { List } from "@radix-ui/react-tabs";
import { useMeasure } from "@uidotdev/usehooks";
import { type ComponentPropsWithoutRef, useMemo, useState } from "react";

import { cn } from "../../../utils";
import { useFormTabsContext } from "./form-tabs-context";
import { FormTabsListDropdown } from "./form-tabs-list-dropdown";

function useVisibleWidth() {
  const [ref, { width }] = useMeasure();

  return {
    ref,
    width: (width ?? 0) - 24,
  };
}

function useTriggers() {
  const { triggers: triggersConf, tabGroupId } = useFormTabsContext();

  const triggers = useMemo(
    () =>
      triggersConf.map((triggerConf) => {
        return {
          id: `${tabGroupId}###${triggerConf.value}`,
          label: (
            <div className="flex w-full justify-between">
              <span>{triggerConf.label}</span>
            </div>
          ),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggersConf],
  );

  return {
    triggers,
  };
}

export type FormTabsListProps = ComponentPropsWithoutRef<typeof List> & {
  wrapperClassName?: string;
  includeMenuButton?: boolean;
};

export function FormTabsList({
  wrapperClassName,
  className,
  includeMenuButton = false,
  ...props
}: FormTabsListProps) {
  const { ref, width: visibleWidth } = useVisibleWidth();
  const [listWidth, setListWidth] = useState(0);

  const { triggers } = useTriggers();

  const showMenuButton =
    includeMenuButton && visibleWidth > 0 && visibleWidth < listWidth;

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-x-4 border-b", wrapperClassName)}
    >
      <List
        ref={(listRef) => {
          setListWidth(listRef?.scrollWidth ?? 0);
        }}
        className={cn(
          "no-scrollbar relative flex items-center justify-start gap-x-4 overflow-x-auto",
          className,
        )}
        {...props}
      />

      {showMenuButton && <FormTabsListDropdown items={triggers} />}
    </div>
  );
}
