import { createBrowseResult } from "../repository/utils/browse";
import { type Prisma } from "../../generated/client";
import { prisma } from "../client";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";

export const groupRegularTrainingRepository = {
  async create(data: Prisma.GroupRegularTrainingCreateInput) {
    return prisma.groupRegularTraining.create({
      data,
    });
  },

  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters);
    const orderBy = createOrderByObject(sort);
    const pagination = createPaginationObject({ skip, take });

    const rows = await prisma.groupRegularTraining.findMany({
      where,
      orderBy,
      ...pagination,
    });

    return createBrowseResult({
      data: rows,
      entity: "groupRegularTraining",
      where,
    });
  },

  async findAll() {
    return prisma.groupRegularTraining.findMany({
      orderBy: [
        { dayOfWeek: "asc" },
        { startsAt: "asc" },
        { createdAt: "asc" },
      ],
    });
  },

  async findByGroupId(groupId: string) {
    return prisma.groupRegularTraining.findMany({
      where: {
        groupId,
      },
      orderBy: [
        { dayOfWeek: "asc" },
        { startsAt: "asc" },
        { createdAt: "asc" },
      ],
    });
  },
};
