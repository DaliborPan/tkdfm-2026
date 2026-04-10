import type { Prisma, Student } from "../../generated/client";
import { parentMapper } from "../parent/mapper";
import { studentDetailSchema, studentLabelSchema } from "./schema";

type StudentWithParent = Prisma.StudentGetPayload<{
  include: { parent: true };
}>;

export const studentMapper = {
  toStudentLabel(
    student: Pick<Student, "id" | "firstName" | "lastName" | "technicalGrade">,
  ) {
    return studentLabelSchema.parse({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      technicalGrade: student.technicalGrade,
    });
  },

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
