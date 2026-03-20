import { prisma } from "../client";

export const helpdeskTicketRepository = {
  async findAll() {
    return prisma.helpdeskTicket.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByParentId(parentId: string) {
    return prisma.helpdeskTicket.findMany({
      where: {
        parentId,
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
