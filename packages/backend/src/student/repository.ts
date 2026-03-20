import { prisma } from "../client";

export const studentRepository = {
  async findAll() {
    return prisma.student.findMany({
      include: {
        parent: true,
      },
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
        { createdAt: "asc" },
      ],
    });
  },
};
