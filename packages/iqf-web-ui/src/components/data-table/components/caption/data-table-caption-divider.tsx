import { cn } from "../../../../utils/cn";

export function DataTableCaptionDivider({ className }: { className?: string }) {
  return <div className={cn("mx-4 h-4 w-px bg-neutral-200", className)} />;
}
