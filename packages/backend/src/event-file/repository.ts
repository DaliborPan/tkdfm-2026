import { prisma } from "../client";

export const eventFileRepository = {
  async findAll() {
    return prisma.eventFile.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByEventId(eventId: string) {
    return prisma.eventFile.findMany({
      where: {
        eventId,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
