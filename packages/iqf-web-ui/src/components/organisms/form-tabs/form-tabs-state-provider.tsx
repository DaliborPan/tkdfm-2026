import { type PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FormTabsStateContext } from "./form-tabs-state-context";

export function FormTabsStateProvider({ children }: PropsWithChildren) {
  const [fields, setFields] = useState<string[]>([]);

  const {
    getFieldState,
    formState: { errors },
  } = useFormContext();

  const registerField = useCallback((field: string) => {
    setFields((prevFields) => [...prevFields, field]);
  }, []);

  const unregisterField = useCallback((field: string) => {
    setFields((prevFields) =>
      prevFields.filter((prevField) => prevField !== field),
    );
  }, []);

  const tabErrors = useMemo(() => {
    const controls = fields.map((field) => field.split("###"));

    return controls.reduce(
      (acc, [tabGroupId, tabId, fieldId]) => {
        const hasError = getFieldState(fieldId)?.error;

        if (hasError) {
          acc[`${tabGroupId}###${tabId}`] =
            (acc[`${tabGroupId}###${tabId}`] || 0) + 1;
        }

        return acc;
      },
      {} as Record<string, number>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <FormTabsStateContext.Provider
      value={{
        fields,

        registerField,
        unregisterField,

        tabErrors,
      }}
    >
      {children}
    </FormTabsStateContext.Provider>
  );
}
