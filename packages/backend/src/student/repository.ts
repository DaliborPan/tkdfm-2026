import { type Prisma, type StudentCandidate } from "../../generated/client";
import { prisma } from "../client";

export const studentRepository = {
  async createFromCandidate(candidate: StudentCandidate) {
    return prisma.student.create({
      data: {
        tkdid: candidate.tkdid,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        importActive: candidate.active,
        technicalGrade: candidate.technicalGrade,
        technicalGradeStart: candidate.technicalGradeStart,
        parent: {
          create: {
            gender: candidate.gender,
            role: "PARENT",
            nationalId: candidate.nationalId,
            birthDate: candidate.birthDate,
            street: candidate.street,
            streetNumber: candidate.streetNumber,
            city: candidate.city,
            phoneNumber: candidate.phoneNumber,
            email: candidate.email,
            registered: candidate.registered,
          },
        },
      },
    });
  },

  async update(id: string, data: Prisma.StudentUpdateInput) {
    return prisma.student.update({
      where: {
        id,
      },
      data,
      include: {
        parent: true,
      },
    });
  },

  async findAll() {
    return prisma.student.findMany({
      include: {
        parent: true,
      },
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
        { createdAt: "asc" },
      ],
    });
  },
};
