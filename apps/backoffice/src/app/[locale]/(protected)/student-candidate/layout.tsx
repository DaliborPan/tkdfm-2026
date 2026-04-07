"use client";

import { type PropsWithChildren } from "react";

import { StudentCandidateEvidence } from "@/modules/student-candidate/evidence";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <StudentCandidateEvidence>{children}</StudentCandidateEvidence>
    </div>
  );
}
