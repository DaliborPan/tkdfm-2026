import { studentRepository } from "../../student/repository";
import { type studentService } from "../../student/service";
import { type TeamMemberType } from "../schema";
import { createTkdPortalLogs } from "./create-tkd-portal-logs";
import { compareStudentAndMember } from "./utils";

type AllStudents = Awaited<ReturnType<typeof studentService.findAll>>;

const prepareStudent = (
  student: AllStudents[number] & {
    parent: NonNullable<AllStudents[number]["parent"]>;
  },
  member: TeamMemberType,
) => ({
  tkdid: member.tkdid,
  inactive: student.inactive,
  importActive: member.importActive,
  firstName: member.firstName,
  lastName: member.lastName,
  technicalGrade: member.technicalGrade,
  technicalGradeStart: member.technicalGradeStart ?? undefined,
  parent: {
    update: {
      role: student.parent.role,
      nationalId: student.parent.nationalId,
      birthDate: member.birthDate ?? undefined,
      phoneNumber: member.phoneNumber ?? undefined,
      email: member.email ?? undefined,
      street: member.street ?? undefined,
      streetNumber: member.streetNumber ?? undefined,
      city: member.city ?? undefined,
      registered: member.registered ?? undefined,
      gender: member.gender,
    },
  },
});

export const updateExistingStudents = async (
  allStudents: AllStudents,
  portalMembers: TeamMemberType[],
) => {
  const existingTkdPortalMembers = portalMembers.filter((member) =>
    allStudents.some((student) => compareStudentAndMember(member, student)),
  );

  for (const member of existingTkdPortalMembers) {
    const student = allStudents.find((student) =>
      compareStudentAndMember(member, student),
    );

    if (!student?.parent) {
      continue;
    }

    const { count } = await createTkdPortalLogs({ student, member });

    if (count) {
      console.log("Updating student... ", student.lastName);

      await studentRepository.update(
        student.id,
        prepareStudent(
          {
            ...student,
            parent: student.parent,
          },
          member,
        ),
      );
    }
  }
};
