import { Route } from "react-router";

import { PermissionGuard } from "./permission-guard";
import {
  type CreateEvidenceRoutesParams,
  type CreateSimpleEvidenceRoutesParams,
} from "./types";

/**
 * Function that creates path for evidence, that has secondary menu.
 */
export function createEvidencePath(url: string) {
  return `${url}/:name/:id?`;
}

/**
 * Function that creates path for evidence, that doesn't have secondary menu.
 */
export function createSimpleEvidencePath(url: string) {
  return `${url}/:id?`;
}

/**
 * Function that creates routes for evidence, that has secondary menu.
 */
export function createEvidenceRoutes<TPermissionType extends string>({
  url,
  menu,
  evidence,
  ...permissionGuardProps
}: CreateEvidenceRoutesParams<TPermissionType>) {
  return (
    <Route element={<PermissionGuard {...permissionGuardProps} />}>
      <Route path={url} element={menu}>
        <Route path={createEvidencePath(url)} element={evidence} />
      </Route>
    </Route>
  );
}

/**
 * Function that creates routes for evidence, that doesn't have
 * secondary menu.
 */
export function createSimpleEvidenceRoutes<TPermissionType extends string>({
  url,
  evidence,
  ...permissionGuardProps
}: CreateSimpleEvidenceRoutesParams<TPermissionType>) {
  return (
    <Route element={<PermissionGuard {...permissionGuardProps} />}>
      <Route path={createSimpleEvidencePath(url)} element={evidence} />
    </Route>
  );
}
