import {
  type EntityServiceBrowseType,
  type EntityServiceGetType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { studentCandidateMapper } from "./mapper";
import { studentCandidateRepository } from "./repository";
import {
  type StudentCandidateBrowseType,
  type StudentCandidateDetailType,
} from "./schema";

const browse: EntityServiceBrowseType<{
  items: StudentCandidateBrowseType[];
  totalCount: number;
}> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const result = await studentCandidateRepository.browse(input);

  return {
    items: result.items.map(studentCandidateMapper.toStudentCandidateBrowse),
    totalCount: result.totalCount,
  };
};

const get: EntityServiceGetType<StudentCandidateDetailType> = async ({
  id,
  currentUser,
}) => {
  validateTrainer(currentUser);

  const row = await studentCandidateRepository.get(id);
  return row ? studentCandidateMapper.toStudentCandidateDetail(row) : null;
};

export const studentCandidateService = {
  browse,
  get,

  async findAll() {
    const rows = await studentCandidateRepository.findAll();
    return rows.map(studentCandidateMapper.toStudentCandidateDetail);
  },
};
