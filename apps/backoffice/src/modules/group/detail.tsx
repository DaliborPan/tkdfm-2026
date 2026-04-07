"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import { groupDetailSchema, groupUpdateSchema } from "@repo/backend/group/schema";

import { FormFields } from "./form-fields";

export function GroupDetail() {
  return (
    <Evidence.Detail
      formSchema={groupUpdateSchema}
      detailSchema={groupDetailSchema}
      titleMapper={(data) => data.name}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
