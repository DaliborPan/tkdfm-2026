import { prisma } from "../client";

export const eventRepository = {
  async findAll() {
    return prisma.event.findMany({
      include: {
        seminar: true,
        competition: true,
        camp: true,
        exam: true,
        _count: {
          select: {
            files: true,
            parents: true,
          },
        },
      },
      orderBy: [{ startsAt: "asc" }, { createdAt: "asc" }],
    });
  },
};
