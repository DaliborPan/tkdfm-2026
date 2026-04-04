import { tkdPortalLogCaller } from "@/modules/tkd-portal-log/server/caller";
import {
  tkdPortalLogCreateSchema,
  type TkdPortalLogCreateType,
  tkdPortalLogUpdateSchema,
  type TkdPortalLogUpdateType,
} from "@repo/backend/tkd-portal-log/schema";
import { browseBodySchema, type BrowseBodyType } from "@repo/backend/utils/browse";

type ParseableSchema<T> = {
  parse: (input: unknown) => T;
};

type EntityCaller = {
  browse: {
    schema: ParseableSchema<unknown>;
    handler: (input: unknown) => Promise<{ items: unknown[]; totalCount: number }>;
  };
  get: {
    handler: (id: string) => Promise<unknown | null>;
  };
  create: {
    schema: ParseableSchema<unknown>;
    handler: (input: unknown) => Promise<unknown>;
  };
  update: {
    schema: ParseableSchema<unknown>;
    handler: (id: string, input: unknown) => Promise<unknown>;
  };
};

const entityCallers: Record<string, EntityCaller> = {
  tkdPortalLog: {
    browse: {
      schema: browseBodySchema,
      handler: (input) => tkdPortalLogCaller.browse(input as BrowseBodyType),
    },
    get: {
      handler: tkdPortalLogCaller.get,
    },
    create: {
      schema: tkdPortalLogCreateSchema,
      handler: (input) =>
        tkdPortalLogCaller.create(input as TkdPortalLogCreateType),
    },
    update: {
      schema: tkdPortalLogUpdateSchema,
      handler: (id, input) =>
        tkdPortalLogCaller.update(id, input as TkdPortalLogUpdateType),
    },
  },
};

export function getEntityCaller(entity: string) {
  return entityCallers[entity] ?? null;
}
