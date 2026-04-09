import { type CurrentUserType } from "../auth/current-user";
import { studentRepository } from "../student/repository";
import { validateTrainer } from "../utils/validation";
import { getAccessToken } from "./access-token";
import { createStudentCandidates } from "./import-team-members/create-student-candidates";
import { updateExistingStudents } from "./import-team-members/update-existing-students";
import { getTeamMembers } from "./team-members";

const importTeamMembers = async ({
  currentUser,
}: {
  currentUser: CurrentUserType;
}) => {
  validateTrainer(currentUser);

  const token = await getAccessToken();
  const tkdPortalData = await getTeamMembers(token);

  const allStudents = await studentRepository.findAll();

  await updateExistingStudents(allStudents, tkdPortalData.items);
  await createStudentCandidates(allStudents, tkdPortalData.items);
};

export const tkdPortalService = {
  importTeamMembers,
};
