import type { Prisma } from "../../generated/client";
import { trainingDetailSchema } from "./schema";

type TrainingWithCounts = Prisma.TrainingGetPayload<{
  include: {
    _count: {
      select: {
        attendances: true;
      };
    };
  };
}>;

export const trainingMapper = {
  toTrainingDetail(training: TrainingWithCounts) {
    return trainingDetailSchema.parse({
      id: training.id,
      createdAt: training.createdAt.toISOString(),
      startsAt: training.startsAt.toISOString(),
      endsAt: training.endsAt.toISOString(),
      cancelled: training.cancelled,
      regular: training.regular,
      groupId: training.groupId,
      attendancesCount: training._count.attendances,
    });
  },
};
