import { type UseQueryResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import { type BaseObject } from "../../evidence/base";
import { type MeType } from "./schema";

export type MeContextType<
  TMeType extends BaseObject = MeType,
  TPermissionType extends string = string,
> = {
  query: UseQueryResult<TMeType | null>;

  /**
   * This property is designed to be used in authenticated
   * part of the application.
   *
   * Normally we don't render anything until we have user data (using `AuthProvider`).
   * To not null-check it every time in the application,
   * we can use this property to get authenticated user.
   */
  me: TMeType;

  meId: string | null;

  /**
   * Function to check if the user has a specific permission.
   *
   * @default default implementation provides MeProvider
   */
  hasPermission: (permission: TPermissionType) => boolean;

  /**
   * Function to check if the user has at least one of the given permissions.
   *
   * @default default implementation provides MeProvider
   */
  hasAtLeastOnePermission: (permissions: TPermissionType[]) => boolean;

  /**
   * Custom key for storing `me` data in local storage.
   *
   * @default "securityMe"
   */
  localstorageMeKey: string;
};

export const MeContext = createContext<MeContextType<any, any> | null>(null);

export function useMeContext<
  TMeType extends BaseObject = MeType,
  TPermissionType extends string = string,
>() {
  const context = useContext(MeContext);

  if (!context) {
    throw new Error("[useMeContext]: This hook must be used within MeProvider");
  }

  return context as MeContextType<TMeType, TPermissionType>;
}
