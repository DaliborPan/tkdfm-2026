import { prisma } from "../client";

export const studentCandidateRepository = {
  async findAll() {
    return prisma.studentCandidate.findMany({
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
        { createdAt: "asc" },
      ],
    });
  },
};
