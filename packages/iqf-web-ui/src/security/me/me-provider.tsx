import { queryOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { type PropsWithChildren } from "react";

import { type BaseObject } from "../../evidence/base";
import { MeContext, type MeContextType } from "./me-context";
import { constructAllowedPermissions } from "./me-permission";
import { type MeType } from "./schema";

const getInitialMeFromLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key) || "null");

type MeProviderProps<
  TMeType extends BaseObject = MeType,
  TPermissionType extends string = string,
> = PropsWithChildren<
  Pick<
    Partial<MeContextType<TMeType, TPermissionType>>,
    "localstorageMeKey" | "hasPermission" | "hasAtLeastOnePermission"
  > & {
    /**
     * API endpoint to fetch the user data from. Typically /me endpoint
     */
    api: string;

    /**
     * Whether to enable the query initially. Default is false, because
     * together with OpenIDProvider, this query is triggered after client is initialized.
     *
     * @default false
     */
    enabled?: boolean;

    /**
     * Callback to handle 401 or 403 errors. Other unknown errors are thrown.
     */
    onError?: (error: AxiosError) => Promise<null>;
  }
>;

export const getMeQueryOptions = ({
  enabled = false,
  api,
  onError,
  localstorageMeKey = "securityMe",
}: Pick<
  MeProviderProps,
  "api" | "onError" | "enabled" | "localstorageMeKey"
>) =>
  queryOptions({
    enabled,
    queryKey: [api],
    queryFn: async () => {
      try {
        const response = await axios.get(api);

        if (response.status === 204) {
          localStorage.removeItem(localstorageMeKey);

          return null;
        }

        localStorage.setItem(localstorageMeKey, JSON.stringify(response.data));

        return response.data;
      } catch (e) {
        if (!(e instanceof AxiosError) || !onError) {
          throw e;
        }

        return onError(e);
      }
    },
    placeholderData: getInitialMeFromLocalStorage(localstorageMeKey),
    staleTime: Infinity,
    retry: false,
  });

/**
 * Default implementation of `MeProvider`. If your application requires their
 * own implementation, you can create your own `MeProvider` and use it.
 */
export function MeProvider<
  TMeType extends BaseObject = MeType,
  TPermissionType extends string = string,
>({
  children,
  api,
  onError,
  enabled = false,
  localstorageMeKey = "securityMe",
  ...props
}: MeProviderProps<TMeType, TPermissionType>) {
  const query = useQuery(
    getMeQueryOptions({ api, onError, enabled, localstorageMeKey }),
  );

  const me = query.data as TMeType | undefined;

  const defaultHasPermission = (permission: TPermissionType) => {
    const allowedPermissions = constructAllowedPermissions(
      permission,
    ) as TPermissionType[];

    return allowedPermissions.some((p) =>
      (me as unknown as MeType)?.authorities.includes(p),
    );
  };

  const defaultHasAtLeastOnePermission = (permissions: TPermissionType[]) => {
    return permissions.some((permission) => defaultHasPermission(permission));
  };

  return (
    <MeContext
      value={{
        query,
        meId: me?.id ?? null,
        hasPermission: props.hasPermission ?? defaultHasPermission,
        hasAtLeastOnePermission:
          props.hasAtLeastOnePermission ?? defaultHasAtLeastOnePermission,
        localstorageMeKey,

        me: query.data!,
      }}
    >
      {children}
    </MeContext>
  );
}
