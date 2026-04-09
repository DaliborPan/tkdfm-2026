import { DateLayoutField } from "iqf-web-ui/date-layout-field";
import { LayoutGroup } from "iqf-web-ui/form";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";

import { useStudentCandidateFormContext } from "./hooks/form-context";

export function FormFields() {
  const { watch } = useStudentCandidateFormContext();

  const technicalGrade = watch("technicalGrade");
  const hasAttendedExam = !technicalGrade?.startsWith("10");

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup>
        <DateLayoutField
          type="date"
          readOnly={true}
          name="registered"
          label="Datum registrace"
        />
        <TextLayoutField readOnly={true} name="active" label="Status" />
      </LayoutGroup>

      <LayoutGroup title="Osobní informace">
        <TextLayoutField readOnly={true} name="firstName" label="Jméno" />
        <TextLayoutField readOnly={true} name="lastName" label="Příjmení" />
        <TextLayoutField readOnly={true} name="gender" label="Pohlaví" />
        <TextLayoutField readOnly={true} name="nationalId" label="Rodné číslo" />
        <DateLayoutField
          type="date"
          readOnly={true}
          name="birthDate"
          label="Datum narození"
        />
      </LayoutGroup>

      <LayoutGroup title="Bydliště">
        <TextLayoutField readOnly={true} name="city" label="Město" />
        <TextLayoutField readOnly={true} name="street" label="Ulice" />
        <TextLayoutField
          readOnly={true}
          name="streetNumber"
          label="Číslo popisné"
        />
      </LayoutGroup>

      <LayoutGroup title="Kontaktní údaje">
        <TextLayoutField
          readOnly={true}
          name="phoneNumber"
          label="Telefonní číslo"
        />
        <TextLayoutField readOnly={true} name="email" label="Email" />
      </LayoutGroup>

      <LayoutGroup title="Taekwondo">
        <TextLayoutField readOnly={true} name="tkdid" label="TKD ID" />
        <TextLayoutField
          readOnly={true}
          name="technicalGrade"
          label="Technický stupeň"
        />

        {hasAttendedExam && (
          <DateLayoutField
            type="date"
            readOnly={true}
            name="technicalGradeStart"
            label="Poslední zkouška"
          />
        )}
      </LayoutGroup>
    </div>
  );
}
