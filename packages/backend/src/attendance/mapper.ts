import type { Attendance } from "../../generated/client";
import { attendanceDetailSchema } from "./schema";

export const attendanceMapper = {
  toAttendanceDetail(attendance: Attendance) {
    return attendanceDetailSchema.parse({
      id: attendance.id,
      createdAt: attendance.createdAt.toISOString(),
      excused: attendance.excused,
      studentId: attendance.studentId,
      trainingId: attendance.trainingId,
    });
  },
};
