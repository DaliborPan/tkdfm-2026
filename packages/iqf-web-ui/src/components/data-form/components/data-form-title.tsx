import { useIntl } from "react-intl";

import { type BaseObject } from "../../../evidence/base";
import { useDataFormContext } from "../context/data-form-context";

export function DataFormTitle<TData extends BaseObject>({
  titleMapper,
}: {
  titleMapper: (data: TData) => string;
}) {
  const intl = useIntl();
  const { isNew, entity } = useDataFormContext<TData, TData>();

  return (
    <h1 className="w-full truncate pr-2 text-2xl">
      {isNew
        ? intl.formatMessage({
            id: "data-form.new",
            defaultMessage: "Nový",
          })
        : !entity
          ? intl.formatMessage({
              id: "data-form.loading",
              defaultMessage: "Načítání...",
            })
          : titleMapper(entity)}
    </h1>
  );
}
