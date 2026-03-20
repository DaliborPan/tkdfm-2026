import type { StudentGroup } from "../../generated/client";
import { studentGroupDetailSchema } from "./schema";

export const studentGroupMapper = {
  toStudentGroupDetail(studentGroup: StudentGroup) {
    return studentGroupDetailSchema.parse({
      id: studentGroup.id,
      createdAt: studentGroup.createdAt.toISOString(),
      studentId: studentGroup.studentId,
      groupId: studentGroup.groupId,
    });
  },
};
