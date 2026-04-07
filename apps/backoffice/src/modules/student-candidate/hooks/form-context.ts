import { type StudentCandidateDetailType } from "@repo/backend/student-candidate/schema";
import { useDataFormContext } from "iqf-web-ui/data-form";

export const useStudentCandidateFormContext = useDataFormContext<
  StudentCandidateDetailType,
  StudentCandidateDetailType
>;
