import { tkdPortalLogService } from "@repo/backend/tkd-portal-log";

type EntityService = {
  browse: (body: unknown) => Promise<{ items: unknown[]; totalCount: number }>;
  get: (id: string) => Promise<unknown | null>;
  create: (body: unknown) => Promise<unknown>;
  update: (id: string, body: unknown) => Promise<unknown>;
};

const entityServices: Record<string, EntityService> = {
  tkdPortalLog: {
    browse: tkdPortalLogService.browse,
    get: tkdPortalLogService.get,
    create: tkdPortalLogService.create,
    update: tkdPortalLogService.update,
  },
};

export function getEntityService(entity: string) {
  return entityServices[entity] ?? null;
}
