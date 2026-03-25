import { Content } from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils";
import { FormTabsContentContextProvider } from "./form-tabs-content-context";
import { useFormTabsContext } from "./form-tabs-context";

export function FormTabsContent({
  className,
  value,
  ...props
}: ComponentPropsWithRef<typeof Content>) {
  const { tabGroupId } = useFormTabsContext();

  return (
    <FormTabsContentContextProvider name={`${tabGroupId}###${value}`}>
      <Content
        forceMount={true}
        className={cn(
          "ring-offset-background focus-visible:ring-ring h-full overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=inactive]:hidden",
          className,
        )}
        {...props}
        value={`${tabGroupId}###${value}`}
      />
    </FormTabsContentContextProvider>
  );
}
