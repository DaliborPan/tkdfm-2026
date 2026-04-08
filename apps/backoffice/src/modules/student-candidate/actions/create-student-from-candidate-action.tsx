"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { Button } from "iqf-web-ui/button";
import { Prompt } from "iqf-web-ui/prompt";
import { SimpleSelectField } from "iqf-web-ui/select-field";
import { successToast } from "iqf-web-ui/toast";
import { Cable } from "lucide-react";

import { useBrowseDataQuery } from "@repo/admin-ui/browse-data-query";
import { groupBrowseSchema } from "@repo/backend/group/schema";
import {
  type StudentCandidateCreateStudentType,
  studentCandidateCreateStudentSchema,
} from "@repo/backend/student-candidate/schema";

import { groupConf } from "@/modules/group/conf";

import { studentCandidateConf } from "../conf";

const useGroupOptions = () => {
  const query = useBrowseDataQuery({
    queryKey: [groupConf.api, "create-student-options"],
    api: groupConf.api,
    schema: groupBrowseSchema,
    options: {
      filters: [],
      sort: [],
      take: 100,
      skip: 0,
    },
  });

  return (query.data?.items ?? []).map((group) => ({
    id: group.id,
    title: `${group.name} (${group.shortcut})`,
  }));
};

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
          useOptions={useGroupOptions}
          showClearButton={false}
        />
      }
    >
      <Button iconLeft={{ Icon: Cable }}>Vytvořit studenta</Button>
    </Prompt>
  );
}
