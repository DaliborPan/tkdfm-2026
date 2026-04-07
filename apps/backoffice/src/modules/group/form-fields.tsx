import { Tabs, TabsContent, TabsList, TabsTrigger } from "iqf-web-ui/tabs";

import { useGroupFormContext } from "./hooks/form-context";
import { GroupTabs } from "./tabs/tabs";

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
        <GroupTabs.BaseInfo />
      </TabsContent>

      <TabsContent value="group-regular-training">
        <GroupTabs.GroupRegularTraining />
      </TabsContent>
    </Tabs>
  );
}
