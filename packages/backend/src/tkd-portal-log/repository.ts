import { prisma } from "../client";

export const tkdPortalLogRepository = {
  async findAll() {
    return prisma.tkdPortalLog.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
