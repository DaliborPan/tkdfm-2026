import { type StudentDetailType } from "../../student";
import { type TeamMemberType } from "../schema";

/**
 * Compare existing `Student` a imported `TeamMember`. Normally,
 * we compare based on `nationalId`.
 *
 * Special case for students, that don't have their own nationalId.
 * - If `Student` has the same `tkdid` as `nationalId`,
 * compare `firstName`, `lastName` and `birthDate`.
 */
export const compareStudentAndMember = (
  member: TeamMemberType,
  student: StudentDetailType,
) =>
  student.parent?.nationalId === member.nationalId ||
  (student.tkdid === student.parent?.nationalId &&
    student.firstName === member.firstName &&
    student.lastName === member.lastName &&
    student.parent?.birthDate === member.birthDate);
