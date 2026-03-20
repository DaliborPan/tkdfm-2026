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
};
