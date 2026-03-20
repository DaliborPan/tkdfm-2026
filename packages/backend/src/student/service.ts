import { studentMapper } from "./mapper";
import { studentRepository } from "./repository";

export const studentService = {
  async findAll() {
    const rows = await studentRepository.findAll();
    return rows.map(studentMapper.toStudentDetail);
  },
};
