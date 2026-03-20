import type { Prisma } from "../../generated/client";
import { parentMapper } from "../parent";
import { studentDetailSchema, type StudentDetailType } from "./schema";

type StudentWithParent = Prisma.StudentGetPayload<{
  include: { parent: true };
}>;

export const studentMapper = {
  toStudentDetail(student: StudentWithParent): StudentDetailType {
    return studentDetailSchema.parse({
      id: student.id,
      tkdid: student.tkdid,
      firstName: student.firstName,
      lastName: student.lastName,
      technicalGrade: student.technicalGrade,
      technicalGradeStart: student.technicalGradeStart,
      inactive: student.inactive,
      importActive: student.importActive,
      createdAt: student.createdAt.toISOString(),
      updatedAt: student.updatedAt.toISOString(),
      parent: student.parent
        ? parentMapper.toParentDetail(student.parent)
        : null,
    });
  },
};
