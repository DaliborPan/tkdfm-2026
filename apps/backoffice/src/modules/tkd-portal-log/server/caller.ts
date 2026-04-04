import { type BrowseBodyType } from "@repo/backend/utils/browse";
import {
  type TkdPortalLogCreateType,
  type TkdPortalLogUpdateType,
} from "@repo/backend/tkd-portal-log/schema";
import { tkdPortalLogService } from "@repo/backend/tkd-portal-log/service";

import { getRequestContext } from "@/lib/server/request-context";

export const tkdPortalLogCaller = {
  async browse(input: BrowseBodyType) {
    const { currentUser } = await getRequestContext();

    return tkdPortalLogService.browse({
      input,
      currentUser,
    });
  },

  async get(id: string) {
    const { currentUser } = await getRequestContext();

    return tkdPortalLogService.get({
      id,
      currentUser,
    });
  },

  async create(input: TkdPortalLogCreateType) {
    const { currentUser } = await getRequestContext();

    return tkdPortalLogService.create({
      input,
      currentUser,
    });
  },

  async update(id: string, input: TkdPortalLogUpdateType) {
    const { currentUser } = await getRequestContext();

    return tkdPortalLogService.update({
      id,
      input,
      currentUser,
    });
  },
};
