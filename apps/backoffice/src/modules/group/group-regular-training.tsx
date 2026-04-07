"use client";

import { Chip } from "iqf-web-ui/chip";
import { DateLayoutValue } from "iqf-web-ui/date-layout-value";
import { LayoutGroup } from "iqf-web-ui/form";
import { SelectLayoutValue } from "iqf-web-ui/select-layout-value";
import { TextLayoutValue } from "iqf-web-ui/text-layout-value";

import { useBrowseDataQuery } from "@repo/admin-ui/browse-data-query";
import {
  type GroupRegularTrainingDetailType,
  groupRegularTrainingDetailSchema,
} from "@repo/backend/group-regular-training/schema";

import { groupRegularTrainingConf } from "../group-regular-training/conf";
import { AddGroupRegularTrainingAction } from "./actions/add-group-regular-training-action";
import { dayOfWeekOptions } from "./day-of-week-options";
import { useGroupFormContext } from "./hooks/form-context";

function GroupRegularTrainingCard({
  groupRegularTraining,
}: {
  groupRegularTraining: GroupRegularTrainingDetailType;
}) {
  return (
    <LayoutGroup>
      <SelectLayoutValue
        label="Den v týdnu"
        value={groupRegularTraining.dayOfWeek}
        options={dayOfWeekOptions}
      />
      <DateLayoutValue
        type="time"
        label="Začíná"
        value={groupRegularTraining.startsAt}
      />
      <DateLayoutValue
        type="time"
        label="Končí"
        value={groupRegularTraining.endsAt}
      />

      {groupRegularTraining.note && (
        <TextLayoutValue label="Poznámka" value={groupRegularTraining.note} />
      )}
    </LayoutGroup>
  );
}

export function GroupRegularTraining() {
  const { entity } = useGroupFormContext();

  const query = useBrowseDataQuery({
    queryKey: [groupRegularTrainingConf.api],
    api: groupRegularTrainingConf.api,
    schema: groupRegularTrainingDetailSchema,
    options: {
      filters: entity
        ? [
            {
              column: "TEXT",
              name: "groupId",
              value: [entity.id],
            },
          ]
        : [],
      sort: [],
      take: 100,
      skip: 0,
    },
    enabled: !!entity,
  });

  if (!entity) {
    return null;
  }

  const groupRegularTrainings = query.data?.items ?? [];

  return (
    <div className="flex flex-col gap-y-2 p-4">
      <div className="flex items-center gap-x-2 pb-2">
        <h3 className="flex grow items-center gap-x-2 text-xl">
          <span>Pravidelné tréninky</span>

          <Chip inverse={true} size="xs">
            {groupRegularTrainings.length}
          </Chip>
        </h3>

        <div>
          <AddGroupRegularTrainingAction />
        </div>
      </div>

      {groupRegularTrainings.map((groupRegularTraining) => (
        <GroupRegularTrainingCard
          key={groupRegularTraining.id}
          groupRegularTraining={groupRegularTraining}
        />
      ))}
    </div>
  );
}
