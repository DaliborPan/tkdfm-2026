import { type ReactNode } from "react";
import { useIntl } from "react-intl";

import { type BaseObject } from "iqf-web-ui/base";
import { useEntityDetailQuery } from "iqf-web-ui/data-form";

type UseBreadcrumbDetailItemParams<TData extends BaseObject> = {
  /**
   * Maps data to displayed label in breadcrumb.
   *
   * Mostly should be the same as titleMapper for DataForm.
   */
  labelMapper: (data: TData) => ReactNode;

  /**
   * URL, where the breadcrumb is rendered.
   *
   * Clicking on this detail breadcrumb will navigate to {url}/{itemId}.
   */
  url?: string;

  /**
   * When `id` is new, `newLabel` is displayed.
   *
   * @default "Nový záznam"
   */
  newLabel?: ReactNode;
} & Parameters<typeof useEntityDetailQuery<TData, TData>>[0];

/**
 * Example definition of breadcrumb item:
 *
 * ```ts
 * const facilityDetailItem = useBreadcrumbDetailItem({
 *   api: facilityConf.api,
 *   itemId: id,
 *   detailSchema: facilitySchema,
 *   staleTime: Infinity,
 *
 *   labelMapper: facilityTitleMapper,
 *   url: facilityConf.url,
 *   newLabel: intl.formatMessage({
 *     id: "facility.breadcrumb.new",
 *     defaultMessage: "Nové zařízení",
 *   }),
  });
  ```
  *
  * Example usage in breadcrumb items array:
  *
  * ```ts
  * const breadcrumbItems = [
  *   ...facilityDetailItem,
  * ];
  * ```
  */
export function useBreadcrumbDetailItem<TData extends BaseObject>({
  labelMapper,
  newLabel: paramsNewLabel,
  url,
  ...entityDetailQueryParams
}: UseBreadcrumbDetailItemParams<TData>) {
  const intl = useIntl();

  const id = entityDetailQueryParams.itemId;
  const query = useEntityDetailQuery(entityDetailQueryParams);

  if (!id) {
    return [];
  }

  const newLabel =
    paramsNewLabel ??
    intl.formatMessage({
      id: "breadcrumb.new",
      defaultMessage: "Nový záznam",
    });

  return [
    {
      href: url ? `${url}/${id}` : undefined,
      label:
        decodeURIComponent(id) === "+"
          ? newLabel
          : query.isError
            ? intl.formatMessage({
                id: "breadcrumb.detail-error",
                defaultMessage: "Nepodařilo se načíst záznam",
              })
            : !query.data
              ? undefined
              : labelMapper(query.data),
    },
  ];
}
