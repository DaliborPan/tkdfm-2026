import type { StudentCandidate } from "../../generated/client";
import {
  studentCandidateBrowseSchema,
  studentCandidateDetailSchema,
} from "./schema";

export const studentCandidateMapper = {
  toStudentCandidateBrowse(studentCandidate: StudentCandidate) {
    return studentCandidateBrowseSchema.parse({
      id: studentCandidate.id,
      createdAt: studentCandidate.createdAt.toISOString(),
      firstName: studentCandidate.firstName,
      lastName: studentCandidate.lastName,
      nationalId: studentCandidate.nationalId,
      active: studentCandidate.active,
    });
  },

  toStudentCandidateDetail(studentCandidate: StudentCandidate) {
    return studentCandidateDetailSchema.parse({
      id: studentCandidate.id,
      createdAt: studentCandidate.createdAt.toISOString(),
      updatedAt: studentCandidate.updatedAt.toISOString(),
      tkdid: studentCandidate.tkdid,
      firstName: studentCandidate.firstName,
      lastName: studentCandidate.lastName,
      gender: studentCandidate.gender,
      nationalId: studentCandidate.nationalId,
      birthDate: studentCandidate.birthDate,
      street: studentCandidate.street,
      streetNumber: studentCandidate.streetNumber,
      city: studentCandidate.city,
      phoneNumber: studentCandidate.phoneNumber,
      email: studentCandidate.email,
      registered: studentCandidate.registered,
      technicalGrade: studentCandidate.technicalGrade,
      technicalGradeStart: studentCandidate.technicalGradeStart,
      active: studentCandidate.active,
      deleted: studentCandidate.deleted,
    });
  },
};
