import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithRef } from "react";

import { useSettingsContext } from "../../../settings/context";
import { cn } from "../../../utils/cn";

export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: Omit<ComponentPropsWithRef<"a">, "href"> & {
  asChild?: boolean;
  href: string;
}) {
  const {
    router: { Link },
  } = useSettingsContext();

  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      className={cn("text-text-primary-color transition-colors", className)}
      {...props}
    />
  );
}
