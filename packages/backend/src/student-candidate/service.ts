import { studentGroupRepository } from "../student-group/repository";
import { studentRepository } from "../student/repository";
import {
  type EntityServiceBrowseType,
  type EntityServiceGetType,
  type EntityServiceUpdateType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { studentCandidateMapper } from "./mapper";
import { studentCandidateRepository } from "./repository";
import {
  type StudentCandidateBrowseType,
  type StudentCandidateCreateStudentType,
  type StudentCandidateDetailType,
  type StudentCandidateUpdateType,
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

const update: EntityServiceUpdateType<
  StudentCandidateUpdateType,
  StudentCandidateDetailType
> = async ({ id, input, currentUser }) => {
  validateTrainer(currentUser);

  const row = await studentCandidateRepository.update(id, input);
  return studentCandidateMapper.toStudentCandidateDetail(row);
};

const createStudentFromCandidate = async ({
  input,
  currentUser,
}: {
  input: StudentCandidateCreateStudentType;
  currentUser: Parameters<typeof validateTrainer>[0];
}) => {
  validateTrainer(currentUser);

  const candidate = await studentCandidateRepository.get(input.candidateId);

  if (!candidate) {
    throw new Error(`Kandidát ${input.candidateId} nebyl nalezen.`);
  }

  const createdStudent = await studentRepository.createFromCandidate(candidate);

  await studentGroupRepository.create({
    studentId: createdStudent.id,
    groupId: input.groupId,
  });

  await studentCandidateRepository.delete(input.candidateId);

  return {
    studentId: createdStudent.id,
  };
};

export const studentCandidateService = {
  browse,
  get,
  update,
  createStudentFromCandidate,

  async create(data: Parameters<typeof studentCandidateRepository.create>[0]) {
    const row = await studentCandidateRepository.create(data);
    return studentCandidateMapper.toStudentCandidateDetail(row);
  },

  async findAll() {
    const rows = await studentCandidateRepository.findAll();
    return rows.map(studentCandidateMapper.toStudentCandidateDetail);
  },
};
