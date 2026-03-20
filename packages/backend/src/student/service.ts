import { studentMapper } from "./mapper";
import { studentRepository } from "./repository";
import type { StudentDetailType } from "./schema";

export const studentService = {
  async findAll(): Promise<StudentDetailType[]> {
    const rows = await studentRepository.findAll();
    return rows.map(studentMapper.toStudentDetail);
  },
};
