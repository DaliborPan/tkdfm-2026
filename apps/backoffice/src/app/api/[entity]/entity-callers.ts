import { groupUpdateSchema } from "@repo/backend/group/schema";
import { helpdeskTicketUpdateSchema } from "@repo/backend/helpdesk-ticket/schema";
import {
  tkdPortalLogCreateSchema,
  tkdPortalLogUpdateSchema,
} from "@repo/backend/tkd-portal-log/schema";

import { groupCaller } from "@/modules/group/server/caller";
import { helpdeskTicketCaller } from "@/modules/helpdesk-ticket/server/caller";
import { tkdPortalLogCaller } from "@/modules/tkd-portal-log/server/caller";

import {
  createBrowseEntityCaller,
  createCreateEntityCaller,
  createDetailEntityCaller,
  type EntityCaller,
  createUpdateEntityCaller,
} from "./callers";

const entityCallers: Record<string, EntityCaller> = {
  group: {
    ...createBrowseEntityCaller({ caller: groupCaller }),
    ...createDetailEntityCaller({ caller: groupCaller }),
    ...createUpdateEntityCaller({
      schema: groupUpdateSchema,
      caller: groupCaller,
    }),
  },
  helpdeskTicket: {
    ...createBrowseEntityCaller({ caller: helpdeskTicketCaller }),
    ...createDetailEntityCaller({ caller: helpdeskTicketCaller }),
    ...createUpdateEntityCaller({
      schema: helpdeskTicketUpdateSchema,
      caller: helpdeskTicketCaller,
    }),
  },
  tkdPortalLog: {
    ...createBrowseEntityCaller({ caller: tkdPortalLogCaller }),
    ...createDetailEntityCaller({ caller: tkdPortalLogCaller }),
    ...createCreateEntityCaller({
      schema: tkdPortalLogCreateSchema,
      caller: tkdPortalLogCaller,
    }),
    ...createUpdateEntityCaller({
      schema: tkdPortalLogUpdateSchema,
      caller: tkdPortalLogCaller,
    }),
  },
};

export function getEntityCaller(entity: string) {
  return entityCallers[entity] ?? null;
}
