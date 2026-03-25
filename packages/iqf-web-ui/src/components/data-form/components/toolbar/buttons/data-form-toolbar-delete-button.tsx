import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useIntl } from "react-intl";

import { useSettingsContext } from "../../../../../settings/context";
import { apiFetch } from "../../../../../utils/api-fetch";
import { type ButtonElementProps } from "../../../../atoms/button";
import { Message } from "../../../../atoms/message";
import { successToast } from "../../../../atoms/toast";
import { Confirm } from "../../../../molecules/confirm";
import { useDataFormContext } from "../../../context/data-form-context";
import { DataFormToolbarButton } from "./data-form-toolbar-button";

function useDeleteMutation() {
  const intl = useIntl();

  const { entity, api } = useDataFormContext();

  return useMutation({
    mutationFn: async () => {
      if (!entity) {
        return;
      }

      return apiFetch({
        method: "DELETE",
        url: `${api}/${entity.id}`,
        errorMessage: intl.formatMessage({
          id: "data-form.delete.error",
          defaultMessage: "Nepodařilo se smazat záznam.",
        }),
      });
    },
  });
}

type DataFormToolbarDeleteButtonProps = {
  asChild?: boolean;
} & ButtonElementProps;

export function DataFormToolbarDeleteButton({
  asChild = false,
  ...props
}: DataFormToolbarDeleteButtonProps) {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const { isEditing, url, entity, api } = useDataFormContext();

  const mutation = useDeleteMutation();

  const {
    router: { navigate },
  } = useSettingsContext();

  return (
    <Confirm
      title={intl.formatMessage({
        id: "data-form.confirm-dialog.title",
        defaultMessage: "Záznam bude smazán",
      })}
      content={
        <Message variant="error">
          {intl.formatMessage({
            id: "data-form.confirm-dialog.subtitle",
            defaultMessage: "Tuto akci nelze vrátit zpět.",
          })}
        </Message>
      }
      onDecision={async (confirmed) => {
        if (!confirmed || !entity) return;

        await mutation.mutateAsync();

        await queryClient.invalidateQueries({
          predicate: ({ queryKey }) => {
            return queryKey.at(0) === api && queryKey.at(1) !== entity.id;
          },
        });

        successToast(
          intl.formatMessage({
            id: "data-form.submit.sucess.title",
            defaultMessage: "Data byla úspěšně smazána.",
          }),
        );

        navigate(url);
      }}
    >
      {asChild ? (
        props.children
      ) : (
        <DataFormToolbarButton
          {...props}
          variant="base"
          color="error"
          disabled={isEditing}
          icon={{ Icon: Trash2 }}
          tooltip={intl.formatMessage({
            id: "data-form.delete",
            defaultMessage: "Smazat",
          })}
          className="size-9 min-h-0"
        >
          {props.children}
        </DataFormToolbarButton>
      )}
    </Confirm>
  );
}
