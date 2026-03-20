import { prisma } from "../client";

export const parentEventRepository = {
  async findAll() {
    return prisma.parentEvent.findMany({
      include: {
        payment: true,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByEventId(eventId: string) {
    return prisma.parentEvent.findMany({
      where: {
        eventId,
      },
      include: {
        payment: true,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByParentId(parentId: string) {
    return prisma.parentEvent.findMany({
      where: {
        parentId,
      },
      include: {
        payment: true,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
