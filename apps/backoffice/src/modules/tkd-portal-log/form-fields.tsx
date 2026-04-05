import { LayoutGroup } from "iqf-web-ui/form";
import { DateLayoutField } from "iqf-web-ui/date-layout-field";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";

import { useTkdPortalLogFormContext } from "./hooks/form-context";

export function FormFields() {
  const { watch } = useTkdPortalLogFormContext();

  const type = watch("type");

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup title="Zakladni informace">
        <TextLayoutField readOnly={true} name="firstName" label="Jmeno" />
        <TextLayoutField readOnly={true} name="lastName" label="Prijmeni" />
        <TextLayoutField
          readOnly={true}
          name="nationalId"
          label="Rodne cislo"
        />
      </LayoutGroup>

      {type === "CREATE" && (
        <LayoutGroup title="Vytvoreni">
          <DateLayoutField
            type="date"
            readOnly={true}
            name="createdAt"
            label="Vytvoreno"
          />
        </LayoutGroup>
      )}

      {type === "UPDATE" && (
        <LayoutGroup title="Aktualizace">
          <DateLayoutField
            type="date"
            readOnly={true}
            name="createdAt"
            label="Aktualizovano"
          />
          <TextLayoutField readOnly={true} name="field" label="Sloupec" />
          <TextLayoutField
            readOnly={true}
            name="oldValue"
            label="Stara hodnota"
          />
          <TextLayoutField
            readOnly={true}
            name="newValue"
            label="Nova hodnota"
          />
        </LayoutGroup>
      )}

      <LayoutGroup title="Poznamka">
        <TextLayoutField multiline={true} name="note" />
      </LayoutGroup>
    </div>
  );
}
