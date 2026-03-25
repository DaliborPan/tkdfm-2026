import { useIntl } from "react-intl";
import { Outlet } from "react-router";

import { useMeContext } from "../security/me";
import { type CreateSimpleEvidenceRoutesParams } from "./types";

export function PermissionGuard<TPermissionType extends string>({
  permission,
  unauthorized,
}: Pick<
  CreateSimpleEvidenceRoutesParams<TPermissionType>,
  "permission" | "unauthorized"
>) {
  const intl = useIntl();
  const { hasPermission } = useMeContext();

  if (permission && !hasPermission(permission)) {
    return (
      unauthorized ?? (
        <div>
          {intl.formatMessage({
            id: "permission-guard.unauthorized",
            defaultMessage: "Stránka nebyla nalezena.",
          })}
        </div>
      )
    );
  }

  return <Outlet />;
}
