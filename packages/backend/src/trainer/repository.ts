import { prisma } from "../client";

export const trainerRepository = {
  async findAll() {
    return prisma.trainer.findMany({
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });
  },
};
