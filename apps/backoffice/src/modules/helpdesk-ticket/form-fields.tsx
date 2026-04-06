import { LayoutGroup } from "iqf-web-ui/form";
import { DateLayoutField } from "iqf-web-ui/date-layout-field";
import { SimpleSelectLayoutField } from "iqf-web-ui/select-layout-field";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";

import { helpdeskTicketStatusOptions } from "./options";

export function FormFields() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup title="Základní informace">
        <TextLayoutField readOnly={true} name="reporterName" label="Jméno" />
        <SimpleSelectLayoutField
          name="status"
          label="Stav"
          options={helpdeskTicketStatusOptions}
        />
        <DateLayoutField
          type="date"
          readOnly={true}
          name="createdAt"
          label="Vytvořeno"
        />
        <DateLayoutField
          type="date"
          readOnly={true}
          name="updatedAt"
          label="Upraveno"
        />
      </LayoutGroup>

      <LayoutGroup title="Popis">
        <TextLayoutField readOnly={true} multiline={true} name="text" />
      </LayoutGroup>
    </div>
  );
}
