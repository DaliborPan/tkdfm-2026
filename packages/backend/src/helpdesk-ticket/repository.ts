import { createBrowseResult } from "../repository/utils/browse";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";
import { prisma } from "../client";
import { type HelpdeskTicketUpdateType } from "./schema";

const includeReporter = {
  parent: {
    include: {
      student: true,
    },
  },
} as const;

export const helpdeskTicketRepository = {
  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters);
    const orderBy = createOrderByObject(sort);
    const pagination = createPaginationObject({ skip, take });

    const helpdeskTickets = await prisma.helpdeskTicket.findMany({
      where,
      orderBy,
      include: includeReporter,
      ...pagination,
    });

    return createBrowseResult({
      data: helpdeskTickets,
      entity: "helpdeskTicket",
      where,
    });
  },

  async get(id: string) {
    return prisma.helpdeskTicket.findUnique({
      where: {
        id,
      },
      include: includeReporter,
    });
  },

  async update(id: string, data: HelpdeskTicketUpdateType) {
    return prisma.helpdeskTicket.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
      include: includeReporter,
    });
  },

  async findAll() {
    return prisma.helpdeskTicket.findMany({
      include: includeReporter,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },

  async findByParentId(parentId: string) {
    return prisma.helpdeskTicket.findMany({
      where: {
        parentId,
      },
      include: includeReporter,
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    });
  },
};
