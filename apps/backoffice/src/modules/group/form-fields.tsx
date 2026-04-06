import { LayoutGroup } from "iqf-web-ui/form";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";

export function FormFields() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup title="Základní informace">
        <TextLayoutField readOnly={true} name="name" label="Název" />
        <TextLayoutField readOnly={true} name="shortcut" label="Zkratka" />
        <TextLayoutField readOnly={true} name="location" label="Lokalita" />
        <TextLayoutField readOnly={true} name="color" label="Barva" />
      </LayoutGroup>

      <LayoutGroup title="Souhrn">
        <TextLayoutField
          readOnly={true}
          name="studentsCount"
          label="Počet studentů"
        />
        <TextLayoutField
          readOnly={true}
          name="regularTrainingsCount"
          label="Počet pravidelných tréninků"
        />
        <TextLayoutField
          readOnly={true}
          name="trainingsCount"
          label="Počet tréninků"
        />
      </LayoutGroup>
    </div>
  );
}
