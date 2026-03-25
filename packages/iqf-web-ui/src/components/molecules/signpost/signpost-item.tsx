import { ChevronRight } from "lucide-react";
import { type PropsWithChildren } from "react";

import { cn } from "../../../utils";
import { Icon } from "../../atoms/icon";

type SignpostProps = PropsWithChildren<{
  Component?: React.ElementType;
  href: string;
  className?: string;
}>;

export function SignpostItem({
  children,
  href,
  Component = "a",
  className,
}: SignpostProps) {
  return (
    <Component
      href={href}
      className={cn(
        "block w-full rounded-sm bg-white px-8 py-8 text-secondary transition-all hover:bg-secondary-100",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {children}
        <Icon className="size-6 text-primary" Icon={ChevronRight} />
      </div>
    </Component>
  );
}
