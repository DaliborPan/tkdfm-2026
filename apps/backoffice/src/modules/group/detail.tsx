"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import { groupDetailSchema } from "@repo/backend/group/schema";

import { FormFields } from "./form-fields";

export function GroupDetail() {
  return (
    <Evidence.Detail
      readOnly={true}
      formSchema={groupDetailSchema}
      detailSchema={groupDetailSchema}
      titleMapper={(data) => data.name}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
