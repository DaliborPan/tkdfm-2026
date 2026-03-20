import { prisma } from "../client";

export const studentGroupRepository = {
  async findAll() {
    return prisma.studentGroup.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByStudentId(studentId: string) {
    return prisma.studentGroup.findMany({
      where: {
        studentId,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByGroupId(groupId: string) {
    return prisma.studentGroup.findMany({
      where: {
        groupId,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
