import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { z } from "zod";

import { useMeContext } from "../../../security/me";
import { useSettingsContext } from "../../../settings/context";
import { useWebSocketSubscription } from "../../../web-socket";
import { useDataFormContext } from "../context/data-form-context";
import { useUrlHref } from "./url-href";

const messageSchema = z.object({
  entity: z.string(),
  id: z.string(),
  type: z.enum(["CREATE", "UPDATE", "DELETE"]),
  deleted: z.boolean().nullish(), // necesary because IQF is making soft deletes
  user: z
    .object({
      id: z.string(),
      displayName: z.string(),
    })
    .nullish(),
});

type Message = z.infer<typeof messageSchema>;

const INITIAL_ALERT_STATE = {
  open: false,
  message: "",
  callback: () => void 0,
};

export function useAutoUpdate() {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const {
    router: { navigate },
  } = useSettingsContext();

  const { entity, isExisting, mode, api } = useDataFormContext();

  const url = useUrlHref();
  const { meId } = useMeContext();

  const [alertState, setAlertState] = useState(INITIAL_ALERT_STATE);

  const shouldSubscribe = isExisting && entity?.id;

  useWebSocketSubscription(
    {
      destinations: shouldSubscribe ? [`/topic/entity/${entity?.id}`] : [],
      onMessage: (message) => {
        let data: Message;
        try {
          data = messageSchema.parse(JSON.parse(message.body));
        } catch (error) {
          console.error("Failed to parse message", error);
          return;
        }

        if (mode === "VIEW" && data.type === "UPDATE" && !data.deleted) {
          queryClient.invalidateQueries({ queryKey: [api] });
        }

        // Do nothing more if the user is the same as the one who made the change
        if (data.user?.id === meId) {
          return;
        }

        if (mode === "EDIT" && data.type === "UPDATE" && !data.deleted) {
          setAlertState({
            open: true,
            message: intl.formatMessage({
              id: "data-form.auto-update.not-refreshed",
              defaultMessage:
                "Data byla v systému aktualizována, ale změny nebyly automaticky načteny, protože formulář je v režimu úpravy. Pokud formulář uložíte, změny v systému budou přepsány. Pokud chcete načíst aktuální data, zavřete formulář a znovu ho otevřete.",
            }),
            callback: () => {
              queryClient.invalidateQueries({ queryKey: [api] });
            },
          });
        }

        if (data.type === "UPDATE" && data.deleted) {
          setAlertState({
            open: true,
            message: intl.formatMessage({
              id: "data-form.auto-update.deleted",
              defaultMessage:
                "Vámi otevřená data byla v systému smazána jiným uživatelem.",
            }),
            callback: () => {
              queryClient.invalidateQueries({ queryKey: [api] });
              navigate(url);
            },
          });
        }
      },
    },
    [mode],
  );

  const resetAlertState = useCallback(() => {
    setAlertState(INITIAL_ALERT_STATE);
  }, []);

  return {
    alertState,
    resetAlertState,
  };
}
