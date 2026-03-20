import { prisma } from "../client";

export const pendingPaymentRepository = {
  async findAll() {
    return prisma.pendingPayment.findMany({
      include: {
        _count: {
          select: {
            payments: true,
          },
        },
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
