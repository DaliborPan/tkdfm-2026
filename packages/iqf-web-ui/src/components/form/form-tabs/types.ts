import { type TabsTriggerProps } from "../../molecules/tabs";

export type FormTabsStateContextType = {
  fields: string[];

  registerField: (field: string) => void;
  unregisterField: (field: string) => void;

  tabErrors: Record<string, number>;
};

export type FormTabsContentContextType = {
  name: string;
};

export type FormTabsTriggerItem = TabsTriggerProps & {
  label: React.ReactNode;
};

export type FormTabsContextType = {
  tabGroupId: string;
  triggers: FormTabsTriggerItem[];
  value: string;
  onValueChange: (value: string) => void;
};
