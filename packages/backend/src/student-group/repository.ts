import { prisma } from "../client";

export const studentGroupRepository = {
  async create(data: { studentId: string; groupId: string }) {
    return prisma.studentGroup.create({
      data: {
        student: {
          connect: {
            id: data.studentId,
          },
        },
        group: {
          connect: {
            id: data.groupId,
          },
        },
      },
    });
  },

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
