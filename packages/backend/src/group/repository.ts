import { type Prisma } from "../../generated/client";
import { createBrowseResult } from "../repository/utils/browse";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";
import { prisma } from "../client";

const includeCounts = {
  _count: {
    select: {
      studentGroups: true,
      groupRegularTrainings: true,
      trainings: true,
    },
  },
} as const;

const groupRegularTrainingOrderBy: Prisma.GroupRegularTrainingOrderByWithRelationInput[] = [
  { dayOfWeek: "asc" },
  { startsAt: "asc" },
  { createdAt: "asc" },
];

const includeDetails = {
  ...includeCounts,
  groupRegularTrainings: {
    orderBy: groupRegularTrainingOrderBy,
  },
} as const;

export const groupRepository = {
  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters);
    const orderBy = createOrderByObject(sort);
    const pagination = createPaginationObject({ skip, take });

    const groups = await prisma.group.findMany({
      where,
      orderBy,
      include: includeCounts,
      ...pagination,
    });

    return createBrowseResult({
      data: groups,
      entity: "group",
      where,
    });
  },

  async get(id: string) {
    return prisma.group.findUnique({
      where: {
        id,
      },
      include: includeDetails,
    });
  },

  async update(id: string, data: Prisma.GroupUpdateInput) {
    return prisma.group.update({
      where: {
        id,
      },
      data,
      include: includeDetails,
    });
  },

  async findAll() {
    return prisma.group.findMany({
      include: includeDetails,
      orderBy: [{ name: "asc" }, { shortcut: "asc" }, { createdAt: "asc" }],
    });
  },
};
