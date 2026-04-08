import { type StudentDetailType } from "../../student";
import { type TeamMemberType } from "../schema";

export const compareStudentAndMember = (
  member: TeamMemberType,
  student: StudentDetailType,
) =>
  student.parent?.nationalId === member.nationalId ||
  (student.tkdid === student.parent?.nationalId &&
    student.firstName === member.firstName &&
    student.lastName === member.lastName &&
    student.parent?.birthDate === member.birthDate);
