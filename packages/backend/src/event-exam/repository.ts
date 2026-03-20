import { prisma } from "../client";

export const eventExamRepository = {
  async findAll() {
    return prisma.eventExam.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
