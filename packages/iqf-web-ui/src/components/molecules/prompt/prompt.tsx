import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "@radix-ui/react-slot";
import { useMutation } from "@tanstack/react-query";
import { type ComponentType, useState } from "react";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";

import { createId } from "../../../utils/create-id";
import { FormProvider } from "../../form/context/form-provider";
import { Dialog } from "../dialog/dialog";
import { type DecisionFn, type PromptProps } from "./types";

export function Prompt<T extends FieldValues>({
  children,
  disabled,
  readOnly,
  dialogProps = { size: "l" },
  content,
  title,
  subtitle,
  cancel,
  confirm,
  footer,
  onDecision,
  onError,
  formSchema,
  defaultValues,
  defaultValuesQuery,
  onFormValidationFailed,
  ...props
}: PromptProps<T> & { Content?: ComponentType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(() => createId());

  const isControlled = props.open !== undefined;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setIsOpen(open);
    }

    props.onOpenChange?.(open);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValuesQuery
      ? ({} as DefaultValues<T>)
      : defaultValues,
  });

  if (Object.entries(form.formState.errors).length > 0) {
    console.log("[VALUES]", form.getValues());
    console.log("[ERRORS]", form.formState.errors);
  }

  const decisionMutation = useMutation({
    mutationFn: (params: Parameters<DecisionFn<T>>[0]) =>
      Promise.resolve(onDecision(params)),
    onError: () => void 0,
  });

  const onSubmit = async (values: T) => {
    try {
      await decisionMutation.mutateAsync({ confirmed: true, data: values });

      if (!isControlled) {
        handleOpenChange(false);
      }
    } catch (error) {
      onError?.(error);
    }
  };

  const isLoading =
    decisionMutation.isPending || defaultValuesQuery?.isLoading || false;

  return (
    <Dialog
      open={isControlled ? props.open : isOpen}
      onOpenChange={async (newState) => {
        handleOpenChange(newState);

        if (newState) {
          if (defaultValuesQuery) {
            const response = await defaultValuesQuery.refetch();

            form.reset(response.data);
          } else {
            // reset form on open
            form.reset(defaultValues);
          }

          setKey(createId());
        }

        if (!newState) {
          // set decision to false on close
          await decisionMutation.mutateAsync({
            confirmed: false,
            data: undefined,
          });
        }
      }}
    >
      <Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>

      <Dialog.Content showClose={!!title} {...dialogProps}>
        <FormProvider
          key={key}
          formSchema={formSchema}
          editing={!disabled && !isLoading && !readOnly}
          {...form}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit, onFormValidationFailed)}
            className="flex flex-col overflow-hidden"
          >
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>

                {subtitle && <Dialog.Subtitle>{subtitle}</Dialog.Subtitle>}
              </Dialog.Header>
            )}

            <Dialog.Body>{content}</Dialog.Body>

            {footer ? (
              footer({
                onSubmit: form.handleSubmit(onSubmit, onFormValidationFailed),
                isLoading,
                isError: decisionMutation.isError,
              })
            ) : (
              <Dialog.Footer>
                <Dialog.Close asChild={true}>
                  {cancel ?? <Dialog.CancelButton />}
                </Dialog.Close>

                {!disabled && !readOnly && (
                  <Slot
                    onClick={form.handleSubmit(
                      onSubmit,
                      onFormValidationFailed,
                    )}
                  >
                    {confirm ? (
                      confirm({
                        onSubmit: form.handleSubmit(
                          onSubmit,
                          onFormValidationFailed,
                        ),
                        isError: decisionMutation.isError,
                        isLoading,
                      })
                    ) : (
                      <Dialog.ConfirmButton isLoading={isLoading} />
                    )}
                  </Slot>
                )}
              </Dialog.Footer>
            )}
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
