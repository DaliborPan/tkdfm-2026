import { type PropsWithChildren } from "react";

import { cn } from "../../../../utils/cn";
import { DataTableFiltersProvider } from "../../context";
import { DataTableFilters } from "../data-table-filters";

export function DataTableCaptionLayout({
  children,
  className,
  defaultShowFilters = false,
}: PropsWithChildren<{
  defaultShowFilters?: boolean;
  className?: string;
}>) {
  return (
    <DataTableFiltersProvider defaultShowFilters={defaultShowFilters}>
      <div
        className={cn(
          "flex shrink-0 items-center overflow-x-auto text-nowrap rounded-t-lg border-b bg-white px-4",
          className,
        )}
      >
        {children}
      </div>

      <DataTableFilters />
    </DataTableFiltersProvider>
  );
}

export function DataTableCaptionTopRowLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex w-full min-w-fit gap-x-8 py-2.5", className)}>
      {children}
    </div>
  );
}

export function DataTableCaptionBottomRowLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex items-center", className)}>{children}</div>;
}

export function DataTableCaptionSettingsLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex items-center gap-x-1", className)}>{children}</div>
  );
}
