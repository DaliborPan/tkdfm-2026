import { Root } from "@radix-ui/react-tabs";
import { useId, useMemo, useState } from "react";

import { cn } from "../../../utils";
import { type FormTabTriggerConf, FormTabsProvider } from "./form-tabs-context";
import { FormTabsList } from "./form-tabs-list";
import { FormTabsTrigger } from "./form-tabs-trigger";

export type FormTabsProps = Omit<
  React.ComponentPropsWithoutRef<typeof Root>,
  "defaultValue"
> & {
  defaultValue: string;

  // enable nullish values to make it easier to define triggers in a more dynamic way
  triggers: (FormTabTriggerConf | undefined | null | false)[];
};

export function FormTabs({
  defaultValue,
  triggers,
  children,
  ...props
}: FormTabsProps) {
  const id = useId();

  const [value, setValue] = useState(`${id}###${defaultValue}`);

  const providerValue = useMemo(
    () => ({
      tabGroupId: id,
      triggers: triggers.filter(Boolean) as FormTabTriggerConf[],
      value,
      onValueChange: setValue,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [triggers, value],
  );

  return (
    <FormTabsProvider value={providerValue}>
      <Root
        value={value}
        onValueChange={setValue}
        className={cn("flex h-full flex-col", props.className)}
        {...props}
      >
        <FormTabsList includeMenuButton={true} wrapperClassName="px-4">
          {providerValue.triggers.map((trigger) => (
            <FormTabsTrigger
              key={trigger.value}
              {...trigger}
              value={`${id}###${trigger.value}`}
            >
              {trigger.label}
            </FormTabsTrigger>
          ))}
        </FormTabsList>

        {children}
      </Root>
    </FormTabsProvider>
  );
}
