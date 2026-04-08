"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { Button } from "iqf-web-ui/button";
import { Confirm } from "iqf-web-ui/confirm";
import { Message } from "iqf-web-ui/message";
import { successToast } from "iqf-web-ui/toast";
import { Download } from "lucide-react";

import { studentCandidateConf } from "../conf";

const useTriggerTkdPortalSyncMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      apiFetch({
        method: "POST",
        url: `${studentCandidateConf.api}/trigger-tkd-portal-sync`,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [studentCandidateConf.api],
      }),
  });
};

export function TriggerTkdPortalSyncAction() {
  const mutation = useTriggerTkdPortalSyncMutation();

  return (
    <Confirm
      title="Nahrát nejnovější data ze svazu"
      onDecision={async (confirmed) => {
        if (!confirmed) {
          return;
        }

        await mutation.mutateAsync();

        successToast("Data byla úspěšně nahrána");
      }}
      content={
        <Message>Opravdu chcete nahrát nejnovější data ze svazu?</Message>
      }
    >
      <Button iconLeft={{ Icon: Download }}>
        Nahrát nejnovější data ze svazu
      </Button>
    </Confirm>
  );
}
