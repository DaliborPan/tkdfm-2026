import { type PropsWithChildren } from "react";
import {
  type FieldValues,
  type FormProviderProps,
  FormProvider as ReactHookFormProvider,
  useFormContext as useReactHookFormContext,
} from "react-hook-form";
import { z } from "zod";

import { FormTabsStateProvider } from "../form-tabs/form-tabs-state-provider";
import { FormContext } from "./form-context";
import { type FormContextType } from "./types";

function getFormSchemaShape(
  formSchema: z.ZodSchema | undefined,
): Record<string, z.ZodSchema> {
  if (formSchema instanceof z.ZodObject) {
    return formSchema._def.shape();
  }

  if (formSchema instanceof z.ZodEffects) {
    return getFormSchemaShape(formSchema._def.schema);
  }

  return {};
}

function FormProvider_<TFieldValues extends FieldValues>({
  children,
  editing = true,
  formSchema,
}: PropsWithChildren<Partial<FormContextType<TFieldValues>>>) {
  const reactHookFormContext = useReactHookFormContext<TFieldValues>();

  const isRequired = (name: string) => {
    const formSchemaShape = getFormSchemaShape(formSchema);
    const fieldSchema = formSchemaShape?.[name];

    if (!fieldSchema) {
      return false;
    }

    return (
      !(fieldSchema instanceof z.ZodNullable) &&
      !(fieldSchema instanceof z.ZodOptional)
    );
  };

  return (
    <FormContext.Provider
      value={{
        editing,
        formSchema,
        isRequired,
        ...reactHookFormContext,
      }}
    >
      <FormTabsStateProvider>{children}</FormTabsStateProvider>
    </FormContext.Provider>
  );
}

export function FormProvider<TFieldValues extends FieldValues>({
  children,
  editing,
  formSchema,
  ...rest
}: PropsWithChildren<
  FormProviderProps<TFieldValues> & Partial<FormContextType<TFieldValues>>
>) {
  return (
    <ReactHookFormProvider {...rest}>
      <FormProvider_ editing={editing} formSchema={formSchema}>
        {children}
      </FormProvider_>
    </ReactHookFormProvider>
  );
}
