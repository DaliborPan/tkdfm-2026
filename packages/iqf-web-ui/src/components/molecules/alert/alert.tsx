import { useState } from "react";

import { Dialog } from "../dialog";
import { type AlertProps } from "./types";

export function Alert({
  children,
  dialogProps = { size: "l" },
  content,
  title,
  subtitle,
  cancel,
  ...props
}: AlertProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isControlled = props.open !== undefined;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setIsOpen(open);
    }

    props.onOpenChange?.(open);
  };

  return (
    <Dialog
      open={isControlled ? props.open : isOpen}
      onOpenChange={(newState) => {
        handleOpenChange(newState);
      }}
    >
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
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
