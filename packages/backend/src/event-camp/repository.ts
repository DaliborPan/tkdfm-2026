import { prisma } from "../client";

export const eventCampRepository = {
  async findAll() {
    return prisma.eventCamp.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
