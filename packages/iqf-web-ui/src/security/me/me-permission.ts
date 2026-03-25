import { useMeContext } from "./me-context";

export function useHasPermissions() {
  const {
    me,
    query: { isLoading },
  } = useMeContext();

  return (permissions: string[]) => {
    if (isLoading || !me) {
      return false;
    }

    // if (permissions.length === 0) {
    //   return true;
    // }

    return permissions.some((permission) => {
      const allowedPermissions = constructAllowedPermissions(permission);

      return allowedPermissions.some((p) => me.authorities.includes(p));
    });
  };
}

export function constructAllowedPermissions(permission: string) {
  const permissions: Set<string> = new Set<string>();
  permissions.add(permission);

  if (!isWritePermission(permission)) {
    // if it is read permission, add write permission also
    permissions.add(getWritePermission(permission));
  }

  const parentPermission = getParentPermission(permission);

  if (parentPermission !== null) {
    // if there is parent permission, add it also
    constructAllowedPermissions(parentPermission).forEach((p) =>
      permissions.add(p),
    );
  }

  return Array.from(permissions);
}

function isWritePermission(permission: string) {
  return permission.endsWith(".write");
}

function getWritePermission(permission: string) {
  return isWritePermission(permission) ? permission : `${permission}.write`;
}

function getReadPermission(permission: string) {
  return isWritePermission(permission)
    ? permission.substring(0, permission.length - ".write".length)
    : permission;
}

function getParentPermission(permission: string) {
  const isWritePermissionB = isWritePermission(permission);
  const readPermission = getReadPermission(permission);

  const lastHierarchySeparator = readPermission.lastIndexOf(":");
  if (lastHierarchySeparator === -1) {
    return null;
  }

  const parentPermission = readPermission.substring(0, lastHierarchySeparator);

  return isWritePermissionB ? `${parentPermission}.write` : parentPermission;
}
