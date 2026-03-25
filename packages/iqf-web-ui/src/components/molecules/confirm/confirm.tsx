import { Slot } from "@radix-ui/react-slot";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Dialog } from "../dialog";
import { type ConfirmProps } from "./types";

export function Confirm({
  children,
  dialogProps = { size: "m" },
  disabled,
  content,
  title,
  subtitle,
  cancel,
  confirm,
  onDecision,
  onError,
  ...props
}: ConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isControlled = props.open !== undefined;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setIsOpen(open);
    }

    props.onOpenChange?.(open);
  };

  const decisionMutation = useMutation({
    mutationFn: (confirmed: boolean) => Promise.resolve(onDecision(confirmed)),

    /**
     * TODO: docs why this is needed - smth with duplicated error toast bcs of triggering
     * default error handling in MutationCache on queryClient
     */
    onError: () => void 0,
  });

  const onConfirm = async () => {
    try {
      await decisionMutation.mutateAsync(true);

      if (!isControlled) {
        handleOpenChange(false);
      }
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <Dialog
      open={isControlled ? props.open : isOpen}
      onOpenChange={async (newState) => {
        handleOpenChange(newState);

        if (!newState) await decisionMutation.mutateAsync(false);
      }}
    >
      {/* TODO: tootip trigger */}
      <Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>

      <Dialog.Content showClose={!!title} {...dialogProps}>
        {title && (
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>

            {subtitle && <Dialog.Subtitle>{subtitle}</Dialog.Subtitle>}
          </Dialog.Header>
        )}

        <Dialog.Body>{content}</Dialog.Body>

        <Dialog.Footer>
          <Dialog.Close asChild={true}>
            {cancel ?? <Dialog.CancelButton />}
          </Dialog.Close>

          {!disabled && (
            <Slot onClick={onConfirm}>
              {confirm ? (
                confirm({
                  isError: decisionMutation.isError,
                  isLoading: decisionMutation.isPending,
                })
              ) : (
                <Dialog.ConfirmButton isLoading={decisionMutation.isPending} />
              )}
            </Slot>
          )}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
