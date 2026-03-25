import type { PropsWithChildren } from "react";

import { cn } from "../../../utils/cn";
import type { IconProps } from "./types";

export function Icon({
  Icon,
  className,
  ...iconProps
}: PropsWithChildren<IconProps>) {
  return (
    <Icon {...iconProps} className={cn("size-4 flex-shrink-0", className)} />
  );
}
