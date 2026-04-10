import type { Prisma } from "../../generated/client";
import { trainingBrowseSchema, trainingDetailSchema } from "./schema";

type TrainingBrowseRow = Prisma.TrainingGetPayload<{
  include: {
    group: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

type TrainingDetailRow = Prisma.TrainingGetPayload<{
  include: {
    group: {
      select: {
        id: true;
        name: true;
      };
    };
    attendances: {
      include: {
        student: {
          select: {
            id: true;
            firstName: true;
            lastName: true;
            technicalGrade: true;
          };
        };
      };
    };
  };
}>;

export const trainingMapper = {
  toTrainingBrowse(training: TrainingBrowseRow) {
    return trainingBrowseSchema.parse({
      id: training.id,
      createdAt: training.createdAt.toISOString(),
      startsAt: training.startsAt.toISOString(),
      endsAt: training.endsAt.toISOString(),
      cancelled: training.cancelled,
      regular: training.regular,
      group: training.group,
    });
  },

  toTrainingDetail(training: TrainingDetailRow) {
    return trainingDetailSchema.parse({
      id: training.id,
      createdAt: training.createdAt.toISOString(),
      startsAt: training.startsAt.toISOString(),
      endsAt: training.endsAt.toISOString(),
      cancelled: training.cancelled,
      regular: training.regular,
      group: training.group,
      attendances: training.attendances.map((attendance) => ({
        id: attendance.id,
        createdAt: attendance.createdAt.toISOString(),
        excused: attendance.excused,
        studentId: attendance.studentId,
        trainingId: attendance.trainingId,
        student: attendance.student,
      })),
    });
  },
};
