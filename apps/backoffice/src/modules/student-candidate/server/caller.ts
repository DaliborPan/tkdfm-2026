import { studentCandidateService } from "@repo/backend/student-candidate/service";

import {
  createBrowseCaller,
  createDetailCaller,
  createUpdateCaller,
} from "@/lib/server/callers";
import { getRequestContext } from "@/lib/server/request-context";

export const studentCandidateCaller = {
  ...createBrowseCaller(studentCandidateService),
  ...createDetailCaller(studentCandidateService),
  ...createUpdateCaller(studentCandidateService),

  createStudentFromCandidate: async (
    input: Parameters<typeof studentCandidateService.createStudentFromCandidate>[0]["input"],
  ) => {
    const { currentUser } = await getRequestContext();

    return studentCandidateService.createStudentFromCandidate({
      input,
      currentUser,
    });
  },
};
