import { groupRegularTrainingService } from "@repo/backend/group-regular-training/service";

import { createBrowseCaller, createCreateCaller } from "@/lib/server/callers";

export const groupRegularTrainingCaller = {
  ...createBrowseCaller(groupRegularTrainingService),
  ...createCreateCaller(groupRegularTrainingService),
};
