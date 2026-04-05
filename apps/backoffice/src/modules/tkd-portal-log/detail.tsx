"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import {
  tkdPortalLogDetailSchema,
  tkdPortalLogUpdateSchema,
} from "@repo/backend/tkd-portal-log/schema";

import { FormFields } from "./form-fields";

export function TkdPortalLogDetail() {
  return (
    <Evidence.Detail
      formSchema={tkdPortalLogUpdateSchema}
      detailSchema={tkdPortalLogDetailSchema}
      titleMapper={(data) => `${data.firstName} ${data.lastName}`}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
