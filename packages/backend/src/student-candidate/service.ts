import { studentCandidateMapper } from "./mapper";
import { studentCandidateRepository } from "./repository";

export const studentCandidateService = {
  async findAll() {
    const rows = await studentCandidateRepository.findAll();
    return rows.map(studentCandidateMapper.toStudentCandidateDetail);
  },
};
