import { Prisma, type Trainer } from "../../generated/client";
import { prisma } from "../client";
import { normalizeNationalId } from "./national-id";

export const trainerRepository = {
  async findAll() {
    return prisma.trainer.findMany({
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });
  },

  async findByNationalId(nationalId: string) {
    const normalizedNationalId = normalizeNationalId(nationalId);

    if (!normalizedNationalId) {
      return null;
    }

    const rows = await prisma.$queryRaw<Trainer[]>(Prisma.sql`
      SELECT "id", "name", "email", "nationalId"
      FROM "Trainer"
      WHERE regexp_replace("nationalId", '[^0-9]', '', 'g') = ${normalizedNationalId}
      ORDER BY "id" ASC
      LIMIT 1
    `);

    return rows[0] ?? null;
  },
};
