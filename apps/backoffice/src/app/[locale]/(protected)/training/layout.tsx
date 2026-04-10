"use client";

import { type PropsWithChildren } from "react";

import { TrainingEvidence } from "@/modules/training/evidence";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <TrainingEvidence>{children}</TrainingEvidence>
    </div>
  );
}
