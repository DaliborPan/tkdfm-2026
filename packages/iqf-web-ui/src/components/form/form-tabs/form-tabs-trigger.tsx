import { TabsTrigger, type TabsTriggerProps } from "../../molecules/tabs";
import { useFormTabsStateContext } from "./form-tabs-state-context";

export function FormTabsTrigger(props: TabsTriggerProps) {
  const { tabErrors } = useFormTabsStateContext();

  const count = tabErrors[props.value] || 0;

  return (
    <TabsTrigger
      chip={{
        variant: count > 0 ? "error" : "primary",
        content: count > 0 ? count : undefined,
      }}
      {...props}
    />
  );
}
