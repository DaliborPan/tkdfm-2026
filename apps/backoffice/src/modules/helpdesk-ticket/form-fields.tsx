import { LayoutGroup } from "iqf-web-ui/form";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";

export function FormFields() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup title="Zakladni informace">
        <TextLayoutField readOnly={true} name="reporterName" label="Jmeno" />
        <TextLayoutField readOnly={true} name="status" label="Stav" />
        <TextLayoutField readOnly={true} name="createdAt" label="Vytvoreno" />
        <TextLayoutField readOnly={true} name="updatedAt" label="Upraveno" />
      </LayoutGroup>

      <LayoutGroup title="Popis">
        <TextLayoutField readOnly={true} multiline={true} name="text" />
      </LayoutGroup>
    </div>
  );
}
