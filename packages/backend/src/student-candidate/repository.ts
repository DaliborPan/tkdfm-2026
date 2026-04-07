import { createBrowseResult } from "../repository/utils/browse";
import { prisma } from "../client";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";

export const studentCandidateRepository = {
  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters);
    const orderBy = createOrderByObject(sort);
    const pagination = createPaginationObject({ skip, take });

    const rows = await prisma.studentCandidate.findMany({
      where,
      orderBy,
      ...pagination,
    });

    return createBrowseResult({
      data: rows,
      entity: "studentCandidate",
      where,
    });
  },

  async get(id: string) {
    return prisma.studentCandidate.findUnique({
      where: {
        id,
      },
    });
  },

  async findAll() {
    return prisma.studentCandidate.findMany({
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
        { createdAt: "asc" },
      ],
    });
  },
};
