import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

import { IconButton } from "../../components/atoms/button";
import { errorToast } from "../../components/atoms/toast";
import { DEFAULT_ERROR_MESSAGE } from "./const";
import { type IqfAxiosErrorHandler } from "./types";

function ErrorDetails({ details }: { details: any }) {
  const intl = useIntl();

  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="mt-3 flex items-center border-t border-t-error-200 pt-2">
        <div className="grow text-sm">
          {intl.formatMessage({
            id: "error.details",
            defaultMessage: "Podrobnosti:",
          })}
        </div>

        <IconButton
          color="error"
          size="xs"
          iconLeft={{ Icon: open ? ChevronUp : ChevronDown }}
          onClick={() => setOpen((v) => !v)}
        />
      </div>

      {open && (
        <pre className="overflow-auto pt-1 text-xs">
          {JSON.stringify(details, null, 2)}
        </pre>
      )}
    </>
  );
}

function ErrorToast({
  message,
  status,
  code,
  data,
}: Parameters<IqfAxiosErrorHandler>[0]) {
  const intl = useIntl();

  return (
    <div className="flex w-full flex-col">
      <span className="pb-1">{message}</span>
      <span className="text-xs">
        {intl.formatMessage(
          {
            id: "error.status",
            defaultMessage: "Status kód: {status} - {code}",
          },
          {
            status,
            code,
          },
        )}
      </span>
      <span className="pt-1 text-xs">
        {intl.formatMessage(
          {
            id: "error.timestamp",
            defaultMessage: "Datum a čas: {date}",
          },
          {
            date: new Date().toLocaleString(intl.locale),
          },
        )}
      </span>

      {data?.details && <ErrorDetails details={data.details} />}
    </div>
  );
}

export const defaultErrorHandler: IqfAxiosErrorHandler = (params) => {
  const message =
    params.customErrorMessage ??
    params.codeErrorMessage ??
    DEFAULT_ERROR_MESSAGE;

  errorToast(<ErrorToast {...params} message={message} />);
};
