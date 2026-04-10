"use client";

import { Evidence } from "@repo/admin-ui/evidence";
import { trainingDetailSchema } from "@repo/backend/training/schema";

import { FormToolbar } from "./components/form-toolbar";
import { FormFields } from "./form-fields";

export function TrainingDetail() {
  return (
    <Evidence.Detail
      readOnly={true}
      formSchema={trainingDetailSchema}
      detailSchema={trainingDetailSchema}
      titleMapper={(data) => data.group.name}
      toolbar={<FormToolbar />}
    >
      <FormFields />
    </Evidence.Detail>
  );
}
