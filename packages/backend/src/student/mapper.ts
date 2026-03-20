import type { Prisma } from "../../generated/client";
import { parentMapper } from "../parent/mapper";
import { studentDetailSchema } from "./schema";

type StudentWithParent = Prisma.StudentGetPayload<{
  include: { parent: true };
}>;

export const studentMapper = {
  toStudentDetail(student: StudentWithParent) {
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
