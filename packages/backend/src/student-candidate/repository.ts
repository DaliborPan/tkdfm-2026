import { type Prisma } from "../../generated/client";
import { createBrowseResult } from "../repository/utils/browse";
import { prisma } from "../client";
import {
  type BrowseBodyType,
  createOrderByObject,
  createPaginationObject,
  createWhereObject,
} from "../utils";

export const studentCandidateRepository = {
  async create(data: Prisma.StudentCandidateCreateInput) {
    return prisma.studentCandidate.create({
      data,
    });
  },

  async browse({ filters, sort, skip, take }: BrowseBodyType) {
    const where = createWhereObject(filters, {
      custom: {
        deleted: "",
      },
    });
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

  async update(id: string, data: Prisma.StudentCandidateUpdateInput) {
    return prisma.studentCandidate.update({
      where: {
        id,
      },
      data,
    });
  },

  async delete(id: string) {
    return prisma.studentCandidate.delete({
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
