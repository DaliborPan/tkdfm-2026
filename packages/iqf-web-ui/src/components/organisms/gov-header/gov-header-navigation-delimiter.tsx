import { cn } from "iqf-web-ui/cn";

export function GovHeaderNavigationDelimiter({
  className,
}: {
  className?: string;
}) {
  return <div className={cn("mx-3 h-4 w-px bg-white", className)} />;
}
