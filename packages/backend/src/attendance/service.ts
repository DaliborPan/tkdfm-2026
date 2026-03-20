import { attendanceMapper } from "./mapper";
import { attendanceRepository } from "./repository";

export const attendanceService = {
  async findAll() {
    const rows = await attendanceRepository.findAll();
    return rows.map(attendanceMapper.toAttendanceDetail);
  },
};
