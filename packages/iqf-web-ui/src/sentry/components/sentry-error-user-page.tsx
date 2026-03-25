import { AlertTriangle } from "lucide-react";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";

import { Icon } from "../../components/atoms/icon";
import { SentryDefaultButtons } from "./sentry-default-buttons";

export function SentryErrorUserPage({
  eventId,
  actions,
}: {
  eventId?: string | null;
  actions?: ReactNode;
}) {
  const intl = useIntl();

  const renderedActions =
    actions === undefined ? <SentryDefaultButtons /> : actions;

  return (
    <div className="flex h-full w-full items-center justify-center p-20">
      <div className="flex max-w-[450px] flex-col items-center gap-4 text-gray-700">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-red-100">
            <Icon Icon={AlertTriangle} className="size-24 p-4 text-primary" />
          </div>
          <div className="text-4xl font-bold">500</div>
        </div>

        <h2 className="text-xl font-semibold">
          {intl.formatMessage({
            id: "sentry.user.title",
            defaultMessage: "Chyba serveru",
          })}
        </h2>
        <p className="">
          {intl.formatMessage({
            id: "sentry.user.description.text",
            defaultMessage:
              "Omlouváme se, ale došlo k neočekávané chybě na serveru.",
          })}
        </p>
        {renderedActions}
        {eventId && (
          <div className="flex flex-col gap-2 rounded-md bg-secondary-400 p-4">
            <div className="">
              {intl.formatMessage({
                id: "sentry.user.error-message.text",
                defaultMessage:
                  "Na odstranění chyby již pracujeme, pro další komunikaci s podporou využite následující číslo chyby.",
              })}
            </div>
            <div className="text-sm">
              <strong>
                {intl.formatMessage({
                  id: "sentry.user.error-id",
                  defaultMessage: "ID chyby: ",
                })}
              </strong>
              {eventId}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
