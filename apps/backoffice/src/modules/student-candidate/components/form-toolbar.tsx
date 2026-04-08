"use client";

import {
  DataFormToolbarDelimiter,
  DataFormToolbarLayout,
} from "iqf-web-ui/data-form";

import { CreateStudentFromCandidateAction } from "../actions/create-student-from-candidate-action";
import { SoftDeleteAction } from "../actions/soft-delete-action";
import { useStudentCandidateFormContext } from "../hooks/form-context";

export function FormToolbar() {
  const { entity } = useStudentCandidateFormContext();

  return (
    <DataFormToolbarLayout>
      {entity && (
        <>
          <CreateStudentFromCandidateAction candidateId={entity.id} />
          <DataFormToolbarDelimiter />
          <SoftDeleteAction studentCandidateId={entity.id} />
        </>
      )}
    </DataFormToolbarLayout>
  );
}
