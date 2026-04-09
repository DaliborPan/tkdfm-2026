import { studentCandidateRepository } from "../../student-candidate/repository";
import { type StudentDetailType } from "../../student/schema";
import { tkdPortalLogRepository } from "../../tkd-portal-log/repository";
import { type TeamMemberType } from "../schema";
import { compareStudentAndMember } from "./utils";

type AllStudents = StudentDetailType[];

export const createStudentCandidates = async (
  allStudents: AllStudents,
  portalMembers: TeamMemberType[],
) => {
  const allStudentCandidates = await studentCandidateRepository.findAll();

  const nonExistingTkdPortalMembers = portalMembers.filter(
    (member) =>
      !allStudents.some((student) =>
        compareStudentAndMember(member, student),
      ) &&
      !allStudentCandidates.some(
        (candidate) => candidate.nationalId === member.nationalId,
      ),
  );

  for (const member of nonExistingTkdPortalMembers) {
    console.log(
      "Creating student candidate... ",
      member.lastName,
      member.nationalId,
    );

    await tkdPortalLogRepository.create({
      type: "CREATE",
      nationalId: member.nationalId,
      firstName: member.firstName,
      lastName: member.lastName,
    });

    await studentCandidateRepository.create({
      tkdid: member.tkdid,
      firstName: member.firstName,
      lastName: member.lastName,
      gender: member.gender,
      nationalId: member.nationalId,
      birthDate: member.birthDate ?? undefined,
      street: member.street ?? undefined,
      streetNumber: member.streetNumber ?? undefined,
      city: member.city ?? undefined,
      phoneNumber: member.phoneNumber ?? undefined,
      email: member.email ?? undefined,
      registered: member.registered ?? undefined,
      technicalGrade: member.technicalGrade,
      technicalGradeStart: member.technicalGradeStart ?? undefined,
      active: member.importActive,
    });
  }
};
