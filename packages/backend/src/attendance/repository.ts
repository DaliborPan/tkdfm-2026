import { prisma } from "../client";

export const attendanceRepository = {
  async findAll() {
    return prisma.attendance.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
