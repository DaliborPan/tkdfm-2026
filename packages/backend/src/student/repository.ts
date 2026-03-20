import type { Prisma } from "../../generated/client";
import { prisma } from "../client";

type StudentWithParent = Prisma.StudentGetPayload<{
  include: { parent: true };
}>;

export const studentRepository = {
  async findAll(): Promise<StudentWithParent[]> {
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
