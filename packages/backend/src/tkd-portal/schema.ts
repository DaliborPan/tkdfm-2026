import { z } from "zod";

const convertTechnicalGrade = (technicalGrade: string) => {
  if (!technicalGrade.endsWith("dan")) {
    return technicalGrade;
  }

  if (technicalGrade.startsWith("1")) return "I. dan";
  if (technicalGrade.startsWith("2")) return "II. dan";
  if (technicalGrade.startsWith("3")) return "III. dan";
  if (technicalGrade.startsWith("4")) return "IV. dan";
  if (technicalGrade.startsWith("5")) return "V. dan";
  if (technicalGrade.startsWith("6")) return "VI. dan";
  if (technicalGrade.startsWith("7")) return "VII";
  if (technicalGrade.startsWith("8")) return "VIII";
  if (technicalGrade.startsWith("9")) return "IX. dan";
};

const processContact = (
  contact: string | null,
  responsiblePersonContact: string | null,
) => {
  if (
    contact &&
    responsiblePersonContact &&
    contact.toLowerCase() !== responsiblePersonContact.toLowerCase()
  ) {
    return `${contact}, ${responsiblePersonContact}`;
  }

  return contact ?? responsiblePersonContact;
};

const teamMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  surname: z.string(),
  gender: z.enum(["male", "female"]),
  birth_number: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  street: z.string().nullable(),
  street_number: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  responsible_person_phone: z.string().nullable(),
  email: z.string().nullable(),
  responsible_person_email: z.string().nullable(),
  active: z.string(),
  registered: z.string().nullable(),
  technical_grade: z.string(),
  technical_grade_start: z.string().nullable(),
});

export const teamMembersSchema = z
  .object({
    count: z.number(),
    members: z.array(teamMemberSchema),
  })
  .transform((data) => {
    const activeMappedMembers = data.members
      .filter((member) => member.active !== "inactive")
      .map((member) => {
        const tkdid = member.id.toString();

        return {
          tkdid,
          firstName: member.name,
          lastName: member.surname,
          gender: member.gender,

          /**
           * If imported member does not have a birth number, use tkdid as nationalId.
           * Foreign students don't have a birth number.
           */
          nationalId: member.birth_number ?? tkdid,
          birthDate: member.date_of_birth,
          street: member.street,
          streetNumber: member.street_number,
          city: member.city,
          phoneNumber: processContact(
            member.phone,
            member.responsible_person_phone,
          ),
          email: processContact(member.email, member.responsible_person_email),
          registered: member.registered,
          technicalGrade: convertTechnicalGrade(member.technical_grade),
          technicalGradeStart: member.technical_grade_start,
          importActive: member.active,
        };
      });

    return {
      totalCount: activeMappedMembers.length,
      items: activeMappedMembers,
    };
  });

export type TeamMemberType = z.infer<typeof teamMembersSchema>["items"][number];
