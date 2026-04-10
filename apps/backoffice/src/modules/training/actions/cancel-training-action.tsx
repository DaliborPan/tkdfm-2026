"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { Button } from "iqf-web-ui/button";
import { LayoutGroup } from "iqf-web-ui/form";
import { Message } from "iqf-web-ui/message";
import { Prompt } from "iqf-web-ui/prompt";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";
import { successToast } from "iqf-web-ui/toast";
import { Ban } from "lucide-react";

import {
  type TrainingCancelType,
  trainingCancelSchema,
} from "@repo/backend/training/schema";

import { trainingConf } from "../conf";
import { useTrainingFormContext } from "../hooks/form-context";

const useCancelTrainingMutation = (trainingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TrainingCancelType) =>
      apiFetch({
        method: "POST",
        url: `${trainingConf.api}/${trainingId}/cancel`,
        data,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [trainingConf.api],
      });
    },
  });
};

export function CancelTrainingAction() {
  const { entity } = useTrainingFormContext();
  const mutation = useCancelTrainingMutation(entity?.id ?? "");

  if (!entity) {
    return null;
  }

  return (
    <Prompt
      title="Zrušit trénink"
      formSchema={trainingCancelSchema}
      content={
        <div className="flex flex-col gap-y-4">
          <Message>
            Akce je nevratná. Důvod zrušení se ukáže ostatním na portále.
          </Message>

          <LayoutGroup>
            <TextLayoutField name="cancelled" label="Důvod zrušení" />
          </LayoutGroup>
        </div>
      }
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) {
          return;
        }

        await mutation.mutateAsync(data);

        successToast("Trénink byl úspěšně zrušen");
      }}
    >
      <Button
        color="error"
        disabled={!!entity.cancelled}
        iconLeft={{ Icon: Ban }}
      >
        Zrušit trénink
      </Button>
    </Prompt>
  );
}
