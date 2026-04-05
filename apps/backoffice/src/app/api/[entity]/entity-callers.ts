import {
  tkdPortalLogCreateSchema,
  tkdPortalLogUpdateSchema,
} from "@repo/backend/tkd-portal-log/schema";

import { tkdPortalLogCaller } from "@/modules/tkd-portal-log/server/caller";

import {
  type EntityCaller,
  createCrudEntityCaller,
} from "./create-crud-entity-caller";

const entityCallers: Record<string, EntityCaller> = {
  tkdPortalLog: createCrudEntityCaller({
    createSchema: tkdPortalLogCreateSchema,
    updateSchema: tkdPortalLogUpdateSchema,
    caller: tkdPortalLogCaller,
  }),
};

export function getEntityCaller(entity: string) {
  return entityCallers[entity] ?? null;
}
