import { prisma } from "../client";

export const paymentRepository = {
  async findAll() {
    return prisma.payment.findMany({
      include: {
        _count: {
          select: {
            pendingPayments: true,
          },
        },
      },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
