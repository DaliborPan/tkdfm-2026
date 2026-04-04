import type { TkdPortalLogCreateType, TkdPortalLogUpdateType } from "./schema";
import { prisma } from "../client";
import { createBrowseResult } from "../repository/utils/browse";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";

export const tkdPortalLogRepository = {
  async create(data: TkdPortalLogCreateType) {
    return prisma.tkdPortalLog.create({
      data,
    });
  },

  async update(id: string, data: Omit<TkdPortalLogUpdateType, "id">) {
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
