"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

import { cn } from "iqf-web-ui/cn";
import { type EvidenceConf } from "iqf-web-ui/evidence";

export function DataTableCaptionTabsLink({
  className,
  children,
  conf,
}: PropsWithChildren<{
  className?: string;
  conf: EvidenceConf;
}>) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(conf.url);

  return (
    <Link
      href={conf.url}
      className={cn(
        "text-text-primary-color flex items-center gap-x-2 py-2.5 text-sm font-medium",
        isActive && "underline underline-offset-8",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function DataTableCaptionTabsLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex items-center gap-x-6", className)}>{children}</div>
  );
}

export function DataTableCaptionEvidenceConfsTabs({
  evidenceConfs,
  titles,
}: {
  evidenceConfs: Record<string, EvidenceConf>;
  titles: Record<string, string>;
}) {
  return (
    <DataTableCaptionTabsLayout>
      {Object.entries(evidenceConfs).map(([key, conf]) => (
        <DataTableCaptionTabsLink key={conf.url} conf={conf}>
          {titles[key]}
        </DataTableCaptionTabsLink>
      ))}
    </DataTableCaptionTabsLayout>
  );
}
