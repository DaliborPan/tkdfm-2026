import { Root } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ComponentProps } from "react";

import { cn } from "../../../utils/cn";
import { Button } from "../../atoms/button";
import { DialogBody } from "./dialog-body";
import { DialogCancelButton } from "./dialog-cancel-button";
import { DialogClose } from "./dialog-close";
import { DialogConfirmButton } from "./dialog-confirm-button";
import { DialogContent } from "./dialog-content";
import { DialogFooter } from "./dialog-footer";
import { DialogHeader } from "./dialog-header";
import { DialogOverlay } from "./dialog-overlay";
import { DialogSubtitle } from "./dialog-subtitle";
import { DialogTitle } from "./dialog-title";
import { DialogTrigger } from "./dialog-trigger";

function Dialog(props: React.ComponentProps<typeof Root>) {
  return <Root {...props} modal={false} />;
}

// eslint-disable-next-line react/function-component-definition
Dialog.Content = function GovDialogContentComponent({
  className,
  children,
  showClose,
  ...props
}: ComponentProps<typeof DialogContent> & { showClose?: boolean }) {
  return (
    <DialogContent
      {...props}
      className={cn("p-0 sm:rounded-lg", className)}
      onPointerDownOutside={(e) => {
        e.preventDefault();
      }}
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
    >
      {children}

      {showClose && (
        <div className="absolute right-4 top-3.5 flex">
          <DialogClose asChild={true}>
            <Button
              aria-label="Close"
              size="m"
              variant="base"
              iconLeft={{ Icon: X }}
            />
          </DialogClose>
        </div>
      )}
    </DialogContent>
  );
};

Dialog.Trigger = DialogTrigger;

Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Subtitle = DialogSubtitle;
Dialog.Overlay = DialogOverlay;

Dialog.Body = DialogBody;

Dialog.Footer = DialogFooter;
Dialog.Close = DialogClose;
Dialog.CancelButton = DialogCancelButton;
Dialog.ConfirmButton = DialogConfirmButton;

export { Dialog };
