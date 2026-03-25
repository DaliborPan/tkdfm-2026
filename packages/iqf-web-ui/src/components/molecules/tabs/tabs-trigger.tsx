import { Trigger } from "@radix-ui/react-tabs";

import { cn } from "../../../utils/cn";
import { Chip } from "../../atoms/chip";

export type TabsTriggerProps = React.ComponentPropsWithRef<typeof Trigger> & {
  chip?: Pick<React.ComponentProps<typeof Chip>, "variant"> & {
    content?: React.ReactNode;
    className?: string;
    inverse?: boolean;
  };
};

export function TabsTrigger({
  className,
  children,
  chip = {
    variant: "primary",
  },
  ...props
}: TabsTriggerProps) {
  return (
    <Trigger
      className={cn(
        "whitespace-nowrap border-b border-transparent px-1 py-4 text-sm font-bold tracking-[0.2px] text-text-primary-color transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-black data-[state=active]:text-black",
        chip.variant === "error" &&
          chip.content &&
          "text-error data-[state=active]:border-error data-[state=active]:text-error",
        chip.content !== undefined && "pb-3",
        className,
      )}
      {...props}
    >
      {children}

      {chip?.content !== undefined && (
        <Chip
          className={cn("ml-2", chip.className)}
          inverse={chip.inverse ?? true}
          variant={chip.variant ?? "primary"}
          size="xs"
        >
          {chip.content}
        </Chip>
      )}
    </Trigger>
  );
}
