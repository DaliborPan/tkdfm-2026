import { prisma } from "../client";

export const pendingPaymentPaymentRepository = {
  async findAll() {
    return prisma.pendingPaymentPayment.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
