import { type StudentDetailType } from "../../student";
import { tkdPortalLogRepository } from "../../tkd-portal-log/repository";
import { type TeamMemberType } from "../schema";

const omitParentFromFields = (field: string) =>
  field.startsWith("parent.") ? field.slice("parent.".length) : field;

const getValue = (obj: unknown, path: string) => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }

    return undefined;
  }, obj);
};

export const createTkdPortalLogs = ({
  student,
  member,
}: {
  student: StudentDetailType;
  member: TeamMemberType;
}) => {
  const buildLog = (field: string) => ({
    type: "UPDATE" as const,
    nationalId: member.nationalId,
    firstName: member.firstName,
    lastName: member.lastName,
    field: omitParentFromFields(field),
    oldValue: `${getValue(student, field) ?? ""}`,
    newValue: `${getValue(member, omitParentFromFields(field)) ?? ""}`,
  });

  const fieldNames = [
    "tkdid",
    "firstName",
    "lastName",
    "importActive",
    "technicalGrade",
    "technicalGradeStart",
    "parent.phoneNumber",
    "parent.email",
    "parent.street",
    "parent.streetNumber",
    "parent.city",
    "parent.registered",
  ];

  const logs = fieldNames
    .map((fieldName) => {
      const studentValue = getValue(student, fieldName);
      const memberValue = getValue(member, omitParentFromFields(fieldName));

      if (studentValue !== memberValue && !!memberValue) {
        return buildLog(fieldName);
      }
    })
    .filter((log) => log !== undefined);

  if (logs.length) {
    return tkdPortalLogRepository.createMany(logs);
  }

  return {
    count: 0,
  };
};
