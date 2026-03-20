import { prisma } from "../client";

export const groupRepository = {
  async findAll() {
    return prisma.group.findMany({
      include: {
        _count: {
          select: {
            studentGroups: true,
            groupRegularTrainings: true,
            trainings: true,
          },
        },
      },
      orderBy: [{ name: "asc" }, { shortcut: "asc" }, { createdAt: "asc" }],
    });
  },
};
