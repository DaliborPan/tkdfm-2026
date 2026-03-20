import { studentGroupMapper } from "./mapper";
import { studentGroupRepository } from "./repository";

export const studentGroupService = {
  async findAll() {
    const rows = await studentGroupRepository.findAll();
    return rows.map(studentGroupMapper.toStudentGroupDetail);
  },

  async findByStudentId(studentId: string) {
    const rows = await studentGroupRepository.findByStudentId(studentId);
    return rows.map(studentGroupMapper.toStudentGroupDetail);
  },

  async findByGroupId(groupId: string) {
    const rows = await studentGroupRepository.findByGroupId(groupId);
    return rows.map(studentGroupMapper.toStudentGroupDetail);
  },
};
