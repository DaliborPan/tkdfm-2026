import { prisma } from "../client";

export const latestPendingPaymentRepository = {
  async findAll() {
    return prisma.latestPendingPayment.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
