import { type StudentCandidateCreateStudentType } from "@repo/backend/student-candidate/schema";
import { studentCandidateService } from "@repo/backend/student-candidate/service";
import { tkdPortalService } from "@repo/backend/tkd-portal/service";

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
    input: StudentCandidateCreateStudentType,
  ) => {
    const { currentUser } = await getRequestContext();

    return studentCandidateService.createStudentFromCandidate({
      input,
      currentUser,
    });
  },

  importTeamMembers: async () => {
    const { currentUser } = await getRequestContext();

    await tkdPortalService.importTeamMembers({ currentUser });
  },
};
