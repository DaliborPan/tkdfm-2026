import { Tabs, TabsContent, TabsList, TabsTrigger } from "iqf-web-ui/tabs";

import { TrainingTabs } from "./tabs/tabs";

export function FormFields() {
  return (
    <Tabs defaultValue="base-info">
      <TabsList className="px-4">
        <TabsTrigger value="base-info">Základní informace</TabsTrigger>
        <TabsTrigger value="attendances">Docházka</TabsTrigger>
      </TabsList>

      <TabsContent value="base-info">
        <TrainingTabs.BaseInfo />
      </TabsContent>

      <TabsContent value="attendances">
        <TrainingTabs.Attendances />
      </TabsContent>
    </Tabs>
  );
}
