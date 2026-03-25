import { type PropsWithChildren, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type z } from "zod";

import { type BaseObject } from "../../../evidence/base";
import { BasicForm } from "../../form";
import { DataFormContext } from "../context/data-form-context";
import { type DataFormContextType } from "../context/types";
import { useOnFormSubmit } from "../hooks/on-form-submit";

/**
 * Watches for `entity` changes and resets form values accordingly.
 *
 * Handles entity updates (via queryClient.invalidateQueries), but also
 * initial entity details fetch.
 *
 * Note: Previously rendered a "dummy" FormProvider during `query.isFetching`,
 * but this caused issues with Dialog unmounting when form-fields were removed.
 */
function ResetFormOnEntityChange<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>() {
  const form = useFormContext();

  const { defaultValues, entity, isNew } =
    useContext<DataFormContextType<TData, TFieldValues>>(DataFormContext);

  useEffect(() => {
    if (entity) {
      form.reset({
        ...defaultValues,
        ...entity,
      });
    }

    if (isNew) {
      form.reset(defaultValues);
    }
    // `defaultValues` and `form` ommited.
    // - Don't want to run this effect on defaultValues change, because they change every render.
    // - `form` caused infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity, isNew]);

  return null;
}

type DataFormProviderProps<TFieldValues extends BaseObject> =
  PropsWithChildren<{
    formSchema: z.ZodSchema<TFieldValues>;
    className?: string;
  }>;

export function DataFormProvider<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>({ formSchema, className, children }: DataFormProviderProps<TFieldValues>) {
  const { isEditing, entity, defaultValues } =
    useContext<DataFormContextType<TData, TFieldValues>>(DataFormContext);

  const onSubmit = useOnFormSubmit();

  return (
    <BasicForm
      formSchema={formSchema}
      isEditing={isEditing}
      defaultValues={{ ...defaultValues, ...entity }}
      onSubmit={onSubmit}
      className={className}
    >
      {children}

      <ResetFormOnEntityChange />
    </BasicForm>
  );
}
