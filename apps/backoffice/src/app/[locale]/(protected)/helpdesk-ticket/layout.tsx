"use client";

import { type PropsWithChildren } from "react";

import { HelpdeskTicketEvidence } from "@/modules/helpdesk-ticket/evidence";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <HelpdeskTicketEvidence>{children}</HelpdeskTicketEvidence>
    </div>
  );
}
