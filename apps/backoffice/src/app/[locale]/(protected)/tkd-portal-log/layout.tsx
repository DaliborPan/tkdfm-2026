"use client";

import { type PropsWithChildren } from "react";

import { TkdPortalLogEvidence } from "@/modules/tkd-portal-log/evidence";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <TkdPortalLogEvidence>{children}</TkdPortalLogEvidence>
    </div>
  );
}
