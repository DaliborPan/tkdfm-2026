"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import {
  helpdeskTicketDetailSchema,
  helpdeskTicketUpdateSchema,
} from "@repo/backend/helpdesk-ticket/schema";

import { FormFields } from "./form-fields";

export function HelpdeskTicketDetail() {
  return (
    <Evidence.Detail
      formSchema={helpdeskTicketUpdateSchema}
      detailSchema={helpdeskTicketDetailSchema}
      titleMapper={(data) => data.reporterName ?? "Ticket"}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
