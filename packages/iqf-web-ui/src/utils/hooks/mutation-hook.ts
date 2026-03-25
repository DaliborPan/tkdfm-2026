import { type MutationOptions, useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";

import { errorToast } from "../../components/atoms/toast";
import { type ErrorObject } from "../../evidence/base";

export function useMutationWithErrorHandling<
  TData,
  TVariables,
  TError extends AxiosResponse<ErrorObject>,
>(options?: MutationOptions<TData, TError, TVariables>) {
  return useMutation({
    ...options,
    onError: (e) => {
      const message = `ČAS: ${
        e.data.timestamp
          ? new Date(e.data.timestamp).toLocaleString("cs-CZ")
          : new Date().toLocaleString("cs-CZ")
      }
CHYBA: ${e.data.error || "Neznámá chyba"}

ZPRÁVA:
${e.data.message || "Chyba při komunikaci se serverem."}`;

      errorToast(message);
    },
  });
}
