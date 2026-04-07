import { LayoutGroup } from "iqf-web-ui/form";
import { TextLayoutField } from "iqf-web-ui/text-layout-field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "iqf-web-ui/tabs";

import { useGroupFormContext } from "./hooks/form-context";
import { GroupRegularTraining } from "./group-regular-training";

function BaseInfo() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <LayoutGroup title="Základní informace">
        <TextLayoutField name="name" label="Název" />
        <TextLayoutField name="shortcut" label="Zkratka" />
        <TextLayoutField name="location" label="Lokalita" />
        <TextLayoutField name="color" label="Barva" />
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

export function FormFields() {
  const { isEditing } = useGroupFormContext();

  return (
    <Tabs defaultValue="base-info">
      <TabsList className="px-4">
        <TabsTrigger value="base-info">Obecné informace</TabsTrigger>
        <TabsTrigger disabled={isEditing} value="group-regular-training">
          Pravidelné tréninky
        </TabsTrigger>
      </TabsList>

      <TabsContent value="base-info">
        <BaseInfo />
      </TabsContent>

      <TabsContent value="group-regular-training">
        <GroupRegularTraining />
      </TabsContent>
    </Tabs>
  );
}
