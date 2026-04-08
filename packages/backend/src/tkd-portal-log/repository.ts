import { type Prisma } from "../../generated/client";
import { prisma } from "../client";
import { createBrowseResult } from "../repository/utils/browse";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";

export const tkdPortalLogRepository = {
  async createMany(data: Prisma.TkdPortalLogCreateManyInput[]) {
    return prisma.tkdPortalLog.createMany({
      data,
    });
  },

  async create(data: Prisma.TkdPortalLogCreateInput) {
    return prisma.tkdPortalLog.create({
      data,
    });
  },

  async update(id: string, data: Prisma.TkdPortalLogUpdateInput) {
    return prisma.tkdPortalLog.update({
      where: {
        id,
      },
      data,
    });
  },

  async get(id: string) {
    return prisma.tkdPortalLog.findUnique({
      where: {
        id,
      },
    });
  },

  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters);
    const orderBy = createOrderByObject(sort);
    const pagination = createPaginationObject({ skip, take });

    const tkdPortalLogs = await prisma.tkdPortalLog.findMany({
      where,
      orderBy,
      ...pagination,
    });

    return createBrowseResult({
      data: tkdPortalLogs,
      entity: "tkdPortalLog",
      where,
    });
  },

  async findAll() {
    return prisma.tkdPortalLog.findMany({
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
