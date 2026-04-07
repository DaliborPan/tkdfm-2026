import { studentCandidateService } from "@repo/backend/student-candidate/service";

import {
  createBrowseCaller,
  createDetailCaller,
} from "@/lib/server/callers";

export const studentCandidateCaller = {
  ...createBrowseCaller(studentCandidateService),
  ...createDetailCaller(studentCandidateService),
};
