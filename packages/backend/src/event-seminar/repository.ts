import { prisma } from "../client";

export const eventSeminarRepository = {
  async findAll() {
    return prisma.eventSeminar.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
