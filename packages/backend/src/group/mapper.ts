import type { Prisma } from "../../generated/client";
import { groupRegularTrainingMapper } from "../group-regular-training/mapper";
import { groupBrowseSchema, groupDetailSchema } from "./schema";

type GroupWithCounts = Prisma.GroupGetPayload<{
  include: {
    _count: {
      select: {
        studentGroups: true;
        groupRegularTrainings: true;
        trainings: true;
      };
    };
  };
}>;

type GroupWithDetails = Prisma.GroupGetPayload<{
  include: {
    _count: {
      select: {
        studentGroups: true;
        groupRegularTrainings: true;
        trainings: true;
      };
    };
    groupRegularTrainings: true;
  };
}>;

export const groupMapper = {
  toGroupBrowse(group: GroupWithCounts) {
    return groupBrowseSchema.parse({
      id: group.id,
      createdAt: group.createdAt.toISOString(),
      name: group.name,
      shortcut: group.shortcut,
      studentsCount: group._count.studentGroups,
      trainingsCount: group._count.trainings,
    });
  },

  toGroupDetail(group: GroupWithDetails) {
    return groupDetailSchema.parse({
      id: group.id,
      createdAt: group.createdAt.toISOString(),
      name: group.name,
      shortcut: group.shortcut,
      location: group.location,
      color: group.color,
      studentsCount: group._count.studentGroups,
      regularTrainingsCount: group._count.groupRegularTrainings,
      trainingsCount: group._count.trainings,
      groupRegularTrainings: group.groupRegularTrainings.map(
        groupRegularTrainingMapper.toGroupRegularTrainingDetail,
      ),
    });
  },
};
