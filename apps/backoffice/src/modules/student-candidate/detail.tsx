"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import { studentCandidateDetailSchema } from "@repo/backend/student-candidate/schema";

import { FormFields } from "./form-fields";

export function StudentCandidateDetail() {
  return (
    <Evidence.Detail
      readOnly={true}
      formSchema={studentCandidateDetailSchema}
      detailSchema={studentCandidateDetailSchema}
      titleMapper={(data) => `${data.firstName} ${data.lastName}`}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
