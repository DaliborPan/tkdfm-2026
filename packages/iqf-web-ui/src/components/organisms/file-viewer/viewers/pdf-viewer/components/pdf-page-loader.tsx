import { LoaderCircle } from "lucide-react";

import { cn } from "../../../../../../utils/cn";
import { Icon } from "../../../../../atoms/icon";

export function PdfPageLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center text-white",
        className,
      )}
    >
      <Icon Icon={LoaderCircle} className="size-10 animate-spin" />
    </div>
  );
}
