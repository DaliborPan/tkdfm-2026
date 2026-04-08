import { type StudentCandidate } from "../../generated/client";
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
