import { prisma } from "../client";

export const widgetRepository = {
  async findAll() {
    return prisma.widget.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
