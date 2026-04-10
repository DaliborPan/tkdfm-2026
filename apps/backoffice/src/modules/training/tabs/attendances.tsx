import { LayoutGroup } from "iqf-web-ui/form";
import { TextLayoutValue } from "iqf-web-ui/text-layout-value";

import { useTrainingFormContext } from "../hooks/form-context";

function groupByDegree<TStudent extends { technicalGrade: string }>(
  students: TStudent[],
) {
  return students.reduce(
    (acc, student) => {
      const degree = student.technicalGrade;

      if (!acc[degree]) {
        acc[degree] = [];
      }

      acc[degree].push(student);

      return acc;
    },
    {} as Record<string, TStudent[]>,
  );
}

export function Attendances() {
  const { entity } = useTrainingFormContext();

  const groupedStudents = groupByDegree(
    entity?.attendances.map((attendance) => attendance.student) ?? [],
  );

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {Object.keys(groupedStudents).map((degree) => (
        <LayoutGroup key={degree} title={degree}>
          {groupedStudents[degree].map((student) => {
            const attendance = entity?.attendances.find(
              (item) => item.studentId === student.id,
            );

            const studentName = `${student.firstName} ${student.lastName}`;

            return (
              <TextLayoutValue
                key={student.id}
                value={attendance?.excused ? "Omluven" : studentName}
                label={attendance?.excused ? studentName : undefined}
              />
            );
          })}
        </LayoutGroup>
      ))}
    </div>
  );
}
