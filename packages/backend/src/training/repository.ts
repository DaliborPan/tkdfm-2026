import { prisma } from "../client";

export const trainingRepository = {
  async findAll() {
    return prisma.training.findMany({
      include: {
        _count: {
          select: {
            attendances: true,
          },
        },
      },
      orderBy: [{ startsAt: "asc" }, { createdAt: "asc" }],
    });
  },

  async findByGroupId(groupId: string) {
    return prisma.training.findMany({
      where: {
        groupId,
      },
      include: {
        _count: {
          select: {
            attendances: true,
          },
        },
      },
      orderBy: [{ startsAt: "asc" }, { createdAt: "asc" }],
    });
  },
};
