import { type PropsWithChildren } from "react";

export function DataFormToolbarLayout({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-1">{children}</div>;
}

export function DataFormToolbarDelimiter() {
  return <div className="mx-2 h-4 w-px bg-neutral-300" />;
}
