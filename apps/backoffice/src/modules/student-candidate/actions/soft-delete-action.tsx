"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { Button } from "iqf-web-ui/button";
import { Confirm } from "iqf-web-ui/confirm";
import { Message } from "iqf-web-ui/message";
import { successToast } from "iqf-web-ui/toast";
import { Trash } from "lucide-react";

import { studentCandidateConf } from "../conf";

const useSoftDeleteMutation = (studentCandidateId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      apiFetch({
        method: "PUT",
        url: `${studentCandidateConf.api}/${studentCandidateId}`,
        data: {
          deleted: new Date().toISOString(),
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [studentCandidateConf.api],
      }),
  });
};

export function SoftDeleteAction({
  studentCandidateId,
}: {
  studentCandidateId: string;
}) {
  const router = useRouter();
  const mutation = useSoftDeleteMutation(studentCandidateId);

  return (
    <Confirm
      title="Označit za smazaného"
      onDecision={async (confirmed) => {
        if (!confirmed) {
          return;
        }

        await mutation.mutateAsync();

        router.replace(studentCandidateConf.url);

        successToast("Člověk byl označen za smazaného.");
      }}
      content={
        <Message variant="error">
          Opravdu chcete označit člověka za smazaného?
        </Message>
      }
    >
      <Button color="error" iconLeft={{ Icon: Trash }} tooltip="Smazat" />
    </Confirm>
  );
}
