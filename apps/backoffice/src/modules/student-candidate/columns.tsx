import { TypedColumns } from "@repo/admin-ui/data-table";
import { type StudentCandidateBrowseType } from "@repo/backend/student-candidate/schema";

const { tableColumn } = new TypedColumns<StudentCandidateBrowseType>();

export const useColumns = () => {
  const firstNameColumn = tableColumn.text({
    name: "firstName",
    label: "Jméno",
  });

  const lastNameColumn = tableColumn.text({
    name: "lastName",
    label: "Příjmení",
  });

  const nationalIdColumn = tableColumn.text({
    name: "nationalId",
    label: "Rodné číslo",
  });

  const activeColumn = tableColumn.text({
    name: "active",
    label: "Status",
  });

  return [firstNameColumn, lastNameColumn, nationalIdColumn, activeColumn];
};
