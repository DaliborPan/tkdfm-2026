"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "iqf-web-ui/button";
import { Confirm } from "iqf-web-ui/confirm";
import { Message } from "iqf-web-ui/message";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { successToast } from "iqf-web-ui/toast";
import { FolderPlus } from "lucide-react";

import { trainingConf } from "../conf";

const useGenerateTrainingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      apiFetch({
        method: "POST",
        url: `${trainingConf.api}/generate-trainings`,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [trainingConf.api],
      });
    },
  });
};

export function GenerateTrainingsAction() {
  const mutation = useGenerateTrainingsMutation();

  return (
    <Confirm
      dialogProps={{ size: "xl" }}
      title="Generovat tréninky"
      content={
        <div className="flex flex-col gap-y-4">
          <p>
            Nejprve se zkontroluje, pro který poslední měsíc již jsou
            vygenerovány tréninky. Následně se vygenerují tréninky pro další
            měsíc dle pravidelných tréninků skupin.
          </p>

          <Message>
            Opravdu chceš vygenerovat tréninky pro všechny skupiny na další
            měsíc?
          </Message>
        </div>
      }
      onDecision={async (confirmed) => {
        if (!confirmed) {
          return;
        }

        await mutation.mutateAsync();

        successToast("Tréninky byly vygenerovány");
      }}
    >
      <Button iconLeft={{ Icon: FolderPlus }}>Generovat tréninky</Button>
    </Confirm>
  );
}
