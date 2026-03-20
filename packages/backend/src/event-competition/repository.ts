import { prisma } from "../client";

export const eventCompetitionRepository = {
  async findAll() {
    return prisma.eventCompetition.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
