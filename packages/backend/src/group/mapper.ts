import type { Group, Prisma } from "../../generated/client";
import {
  groupBrowseSchema,
  groupDetailSchema,
  groupNameSchema,
} from "./schema";

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
  toGroupName(group: Pick<Group, "id" | "name">) {
    return groupNameSchema.parse({
      id: group.id,
      name: group.name,
    });
  },

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
