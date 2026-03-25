import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { useIntl } from "react-intl";

import { type BaseObject } from "../../../evidence/base";
import { useSettingsContext } from "../../../settings/context";
import { successToast } from "../../atoms/toast";
import { DataFormContext } from "../context/data-form-context";
import { type DataFormContextType } from "../context/types";

export function useOnFormSubmit<
  TData extends TFieldValues,
  TFieldValues extends BaseObject,
>() {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const {
    router: { navigate },
  } = useSettingsContext();

  /**
   * Intentionally we're not using the `useDataTableContext` here,
   * bcs it would throw due to undefined RHF form context.
   */
  const { setMode, mutation, isNew, detailUrlMapper, api, url } =
    useContext<DataFormContextType<TData, TFieldValues>>(DataFormContext);

  return useCallback(
    (values: TFieldValues) => {
      mutation.mutate(
        { values, type: isNew ? "create" : "update" },
        {
          onSuccess: (result) => {
            setMode("VIEW");

            queryClient.invalidateQueries({ queryKey: [api] });

            successToast(
              intl.formatMessage({
                id: "data-form.submit.success.title",
                defaultMessage: "Data byla úspěšně uložena.",
              }),
            );

            if (isNew) {
              navigate(detailUrlMapper(result, url));
            }
          },
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isNew, mutation, intl, navigate, url, api, setMode],
  );
}
