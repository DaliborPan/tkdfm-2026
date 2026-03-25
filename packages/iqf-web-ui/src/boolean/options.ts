import { useIntl } from "react-intl";

export function useBooleanOptions() {
  const intl = useIntl();

  return [
    {
      id: "true",
      title: intl.formatMessage({
        id: "common.yes",
        defaultMessage: "Ano",
      }),
    },
    {
      id: "false",
      title: intl.formatMessage({
        id: "common.no",
        defaultMessage: "Ne",
      }),
    },
  ];
}
