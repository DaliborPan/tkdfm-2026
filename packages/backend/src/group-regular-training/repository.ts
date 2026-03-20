import { prisma } from "../client";

export const groupRegularTrainingRepository = {
  async findAll() {
    return prisma.groupRegularTraining.findMany({
      orderBy: [
        { dayOfWeek: "asc" },
        { startsAt: "asc" },
        { createdAt: "asc" },
      ],
    });
  },

  async findByGroupId(groupId: string) {
    return prisma.groupRegularTraining.findMany({
      where: {
        groupId,
      },
      orderBy: [
        { dayOfWeek: "asc" },
        { startsAt: "asc" },
        { createdAt: "asc" },
      ],
    });
  },
};
