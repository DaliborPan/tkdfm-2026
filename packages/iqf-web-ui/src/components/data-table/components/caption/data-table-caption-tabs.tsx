import { type PropsWithChildren } from "react";

import { type EvidenceConf } from "../../../../evidence/types";
import { useSettingsContext } from "../../../../settings/context";
import { cn } from "../../../../utils/cn";

export function DataTableCaptionTabsLink({
  className,
  children,
  conf,
}: PropsWithChildren<{
  className?: string;
  conf: EvidenceConf;
}>) {
  const {
    router: { Link, pathname },
  } = useSettingsContext();

  const isActive = pathname.startsWith(conf.url);

  return (
    <Link
      href={conf.url}
      className={cn(
        "flex items-center gap-x-2 py-2.5 text-sm font-medium text-text-primary-color",
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
