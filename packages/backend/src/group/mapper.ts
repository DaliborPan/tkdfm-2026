import type { Prisma } from "../../generated/client";
import { groupBrowseSchema, groupDetailSchema } from "./schema";

type GroupWithCounts = Prisma.GroupGetPayload<{
  include: {
    _count: {
      select: {
        studentGroups: true;
        groupRegularTrainings: true;
      };
    };
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
    });
  },

  toGroupDetail(group: GroupWithCounts) {
    return groupDetailSchema.parse({
      id: group.id,
      createdAt: group.createdAt.toISOString(),
      name: group.name,
      shortcut: group.shortcut,
      location: group.location,
      color: group.color,
      studentsCount: group._count.studentGroups,
      regularTrainingsCount: group._count.groupRegularTrainings,
    });
  },
};
