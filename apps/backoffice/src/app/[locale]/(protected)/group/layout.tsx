"use client";

import { type PropsWithChildren } from "react";

import { GroupEvidence } from "@/modules/group/evidence";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <GroupEvidence>{children}</GroupEvidence>
    </div>
  );
}
