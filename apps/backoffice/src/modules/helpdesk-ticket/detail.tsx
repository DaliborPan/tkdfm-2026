"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import { helpdeskTicketDetailSchema } from "@repo/backend/helpdesk-ticket/schema";

import { FormFields } from "./form-fields";

export function HelpdeskTicketDetail() {
  return (
    <Evidence.Detail
      readOnly={true}
      formSchema={helpdeskTicketDetailSchema}
      detailSchema={helpdeskTicketDetailSchema}
      titleMapper={(data) => data.reporterName ?? "Ticket"}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
