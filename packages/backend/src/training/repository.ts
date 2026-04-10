import { type Prisma } from "../../generated/client";
import { createBrowseResult } from "../repository/utils/browse";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";
import { prisma } from "../client";

const browseInclude = {
  group: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

const detailInclude = {
  group: {
    select: {
      id: true,
      name: true,
    },
  },
  attendances: {
    include: {
      student: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          technicalGrade: true,
        },
      },
    },
  },
} as const;

export const trainingRepository = {
  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters);
    const orderBy = sort.length
      ? [createOrderByObject(sort)]
      : [{ startsAt: "asc" as const }, { createdAt: "asc" as const }];
    const pagination = createPaginationObject({ skip, take });

    const rows = await prisma.training.findMany({
      where,
      orderBy,
      include: browseInclude,
      ...pagination,
    });

    return createBrowseResult({
      data: rows,
      entity: "training",
      where,
    });
  },

  async get(id: string) {
    return prisma.training.findUnique({
      where: {
        id,
      },
      include: detailInclude,
    });
  },

  async create(data: Prisma.TrainingCreateInput) {
    return prisma.training.create({
      data,
      include: detailInclude,
    });
  },

  async updateCancelled(id: string, cancelled: string) {
    return prisma.training.update({
      where: {
        id,
      },
      data: {
        cancelled,
      },
      include: detailInclude,
    });
  },

  async getLastTraining() {
    return prisma.training.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
