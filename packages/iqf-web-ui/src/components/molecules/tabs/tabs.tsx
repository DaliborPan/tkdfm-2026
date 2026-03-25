import { Root } from "@radix-ui/react-tabs";
import { useState } from "react";

import { TabsContextProvider } from "./tabs-context";

export type TabsProps = Omit<
  React.ComponentPropsWithoutRef<typeof Root>,
  "defaultValue"
> & {
  defaultValue: string;
};

export function Tabs({ defaultValue, ...props }: TabsProps) {
  const [value, setValue] = useState(defaultValue);

  const providerValue = {
    value,
    onValueChange: setValue,
  };

  return (
    <TabsContextProvider value={providerValue}>
      <Root
        {...props}
        value={props.value ?? value}
        onValueChange={(v) => {
          setValue(v);
          props.onValueChange?.(v);
        }}
      />
    </TabsContextProvider>
  );
}

export const TabsRoot = Root;
