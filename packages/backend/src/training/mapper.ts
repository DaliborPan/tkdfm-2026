import type { Prisma } from "../../generated/client";
import { attendanceMapper } from "../attendance/mapper";
import { groupMapper } from "../group/mapper";
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
      group: groupMapper.toGroupName(training.group),
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
      group: groupMapper.toGroupName(training.group),
      attendances: training.attendances.map(
        attendanceMapper.toAttendanceDetail,
      ),
    });
  },
};
