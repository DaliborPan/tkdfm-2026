import type { GroupRegularTraining } from "../../generated/client";
import { groupRegularTrainingDetailSchema } from "./schema";

export const groupRegularTrainingMapper = {
  toGroupRegularTrainingDetail(groupRegularTraining: GroupRegularTraining) {
    return groupRegularTrainingDetailSchema.parse({
      id: groupRegularTraining.id,
      createdAt: groupRegularTraining.createdAt.toISOString(),
      dayOfWeek: groupRegularTraining.dayOfWeek,
      startsAt: groupRegularTraining.startsAt,
      endsAt: groupRegularTraining.endsAt,
      note: groupRegularTraining.note,
      groupId: groupRegularTraining.groupId,
    });
  },
};
