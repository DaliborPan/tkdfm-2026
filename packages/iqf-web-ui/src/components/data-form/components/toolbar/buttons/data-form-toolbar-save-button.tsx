import { Check } from "lucide-react";
import { useIntl } from "react-intl";

import { Button, type ButtonElementProps } from "../../../../atoms/button";
import { useIsUploadFilesMutationPending } from "../../../../molecules/file-upload/mutation";
import { useDataFormContext } from "../../../context/data-form-context";

type DataFormToolbarSaveButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarSaveButton({
  asChild = false,
  ...props
}: DataFormToolbarSaveButtonProps) {
  const intl = useIntl();

  const isFileUploadMutationPending = useIsUploadFilesMutationPending();

  const { isEditing, mutation } = useDataFormContext();

  return asChild ? (
    props.children
  ) : (
    <Button
      {...props}
      type="submit"
      isLoading={mutation.isPending}
      disabled={!isEditing || isFileUploadMutationPending}
      iconLeft={{ Icon: Check }}
    >
      {intl.formatMessage({
        id: "data-form.save",
        defaultMessage: "Uložit",
      })}
    </Button>
  );
}
