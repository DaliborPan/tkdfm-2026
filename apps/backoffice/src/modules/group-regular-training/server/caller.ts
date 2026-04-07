import { groupRegularTrainingService } from "@repo/backend/group-regular-training/service";

import { createCreateCaller } from "@/lib/server/callers";

export const groupRegularTrainingCaller = {
  ...createCreateCaller(groupRegularTrainingService),
};
