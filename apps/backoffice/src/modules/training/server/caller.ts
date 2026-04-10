import { type TrainingCancelType } from "@repo/backend/training/schema";
import { trainingService } from "@repo/backend/training/service";

import { createBrowseCaller, createDetailCaller } from "@/lib/server/callers";
import { getRequestContext } from "@/lib/server/request-context";

export const trainingCaller = {
  ...createBrowseCaller(trainingService),
  ...createDetailCaller(trainingService),

  async cancel(id: string, input: TrainingCancelType) {
    const { currentUser } = await getRequestContext();

    return trainingService.cancel({
      id,
      input,
      currentUser,
    });
  },

  async generateTrainings() {
    const { currentUser } = await getRequestContext();

    return trainingService.generateTrainings({ currentUser });
  },
};
