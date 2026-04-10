import { DateLayoutField } from "iqf-web-ui/date-layout-field";
import { LayoutGroup } from "iqf-web-ui/form";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";

import { useTrainingFormContext } from "../hooks/form-context";

export function BaseInfo() {
  const { entity } = useTrainingFormContext();

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup title="Obecné informace">
        <TextLayoutField name="group.name" label="Skupina" />
        <DateLayoutField name="startsAt" label="Začátek" />
        <DateLayoutField name="endsAt" label="Konec" />

        {!!entity?.cancelled && (
          <TextLayoutField name="cancelled" label="Zrušeno" />
        )}
      </LayoutGroup>
    </div>
  );
}
