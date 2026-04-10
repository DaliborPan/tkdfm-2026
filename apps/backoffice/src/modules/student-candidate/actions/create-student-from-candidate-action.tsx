"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { Button } from "iqf-web-ui/button";
import { Prompt } from "iqf-web-ui/prompt";
import { SimpleSelectField } from "iqf-web-ui/select-field";
import { successToast } from "iqf-web-ui/toast";
import { Cable } from "lucide-react";

import {
  type StudentCandidateCreateStudentType,
  studentCandidateCreateStudentSchema,
} from "@repo/backend/student-candidate/schema";

import { useGroupOptionsWithShortcut } from "@/modules/group/hooks/api";

import { studentCandidateConf } from "../conf";

const useCreateStudentFromCandidateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: StudentCandidateCreateStudentType) =>
      apiFetch({
        method: "POST",
        url: `${studentCandidateConf.api}/create-student`,
        data,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [studentCandidateConf.api],
      }),
  });
};

export function CreateStudentFromCandidateAction({
  candidateId,
}: {
  candidateId: string;
}) {
  const router = useRouter();
  const mutation = useCreateStudentFromCandidateMutation();

  return (
    <Prompt
      title="Vytvořit studenta"
      defaultValues={{
        candidateId,
      }}
      formSchema={studentCandidateCreateStudentSchema}
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) {
          return;
        }

        await mutation.mutateAsync(data);
        router.replace(studentCandidateConf.url);
        successToast("Student byl vytvořen.");
      }}
      content={
        <SimpleSelectField
          label="Skupina, do které bude přiřazen nový student"
          name="groupId"
          useOptions={useGroupOptionsWithShortcut}
          showClearButton={false}
        />
      }
    >
      <Button iconLeft={{ Icon: Cable }}>Vytvořit studenta</Button>
    </Prompt>
  );
}
