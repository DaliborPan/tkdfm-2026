import * as React from "react";

import { cn } from "@/lib/utils";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid gap-2.5 text-sm data-[invalid=true]:text-destructive",
        "data-[invalid=true]:[&_input]:border-destructive/60",
        "data-[invalid=true]:[&_input]:focus-visible:ring-destructive/30",
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn("font-medium leading-none", className)} {...props} />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export { Field, FieldDescription, FieldGroup, FieldLabel };
