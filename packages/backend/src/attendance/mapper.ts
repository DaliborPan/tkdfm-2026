import type { Prisma } from "../../generated/client";
import { studentMapper } from "../student/mapper";
import { attendanceDetailSchema } from "./schema";

type AttendanceWithStudent = Prisma.AttendanceGetPayload<{
  include: {
    student: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        technicalGrade: true;
      };
    };
  };
}>;

export const attendanceMapper = {
  toAttendanceDetail(attendance: AttendanceWithStudent) {
    return attendanceDetailSchema.parse({
      id: attendance.id,
      createdAt: attendance.createdAt.toISOString(),
      excused: attendance.excused,
      studentId: attendance.studentId,
      trainingId: attendance.trainingId,
      student: studentMapper.toStudentLabel(attendance.student),
    });
  },
};
