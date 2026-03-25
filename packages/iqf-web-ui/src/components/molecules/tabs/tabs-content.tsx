import { Content } from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef } from "react";

import { cn } from "../../../utils/cn";

export function TabsContent({
  className,
  ...props
}: ComponentPropsWithRef<typeof Content>) {
  return (
    <Content
      className={cn(
        "ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}
