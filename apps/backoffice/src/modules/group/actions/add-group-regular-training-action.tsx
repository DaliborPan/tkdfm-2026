"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "iqf-web-ui/api-fetch";
import { Button } from "iqf-web-ui/button";
import { DateLayoutField } from "iqf-web-ui/date-layout-field";
import { LayoutGroup } from "iqf-web-ui/form";
import { Prompt } from "iqf-web-ui/prompt";
import { SimpleSelectLayoutField } from "iqf-web-ui/select-layout-field";
import { successToast } from "iqf-web-ui/toast";
import { Plus } from "lucide-react";

import { groupRegularTrainingCreateSchema } from "@repo/backend/group-regular-training/schema";

import { dayOfWeekOptions } from "@/modules/day-of-week/options";
import { groupRegularTrainingConf } from "@/modules/group-regular-training/conf";

import { groupConf } from "../conf";
import { useGroupFormContext } from "../hooks/form-context";

const defaultValues = {
  dayOfWeek: "MONDAY",
  startsAt: "",
  endsAt: "",
  note: "",
  groupId: "",
};

export function AddGroupRegularTrainingAction() {
  const queryClient = useQueryClient();
  const { entity, isEditing } = useGroupFormContext();

  const mutation = useMutation({
    mutationFn: async (data: typeof defaultValues) =>
      apiFetch({
        method: "POST",
        url: groupRegularTrainingConf.api,
        data,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [groupConf.api] }),
        queryClient.invalidateQueries({
          queryKey: [groupRegularTrainingConf.api],
        }),
      ]);
    },
  });

  if (!entity) {
    return null;
  }

  return (
    <Prompt
      title="Nový pravidelný trénink"
      formSchema={groupRegularTrainingCreateSchema}
      defaultValues={{
        ...defaultValues,
        groupId: entity.id,
      }}
      onDecision={async ({ confirmed, data }) => {
        if (!confirmed) {
          return;
        }

        await mutation.mutateAsync(data);

        successToast("Pravidelný trénink byl úspěšně přidán.");
      }}
      content={
        <div className="flex flex-col gap-y-4">
          <LayoutGroup>
            <SimpleSelectLayoutField
              name="dayOfWeek"
              label="Den v týdnu"
              options={dayOfWeekOptions}
            />
            <DateLayoutField type="time" name="startsAt" label="Začíná" />
            <DateLayoutField type="time" name="endsAt" label="Končí" />
          </LayoutGroup>
        </div>
      }
    >
      <Button disabled={isEditing} variant="outlined" iconLeft={{ Icon: Plus }}>
        Přidat trénink
      </Button>
    </Prompt>
  );
}
