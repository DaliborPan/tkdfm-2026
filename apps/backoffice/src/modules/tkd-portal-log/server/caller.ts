import { tkdPortalLogService } from "@repo/backend/tkd-portal-log/service";

import {
  createBrowseCaller,
  createCreateCaller,
  createDetailCaller,
  createUpdateCaller,
} from "@/lib/server/callers";

export const tkdPortalLogCaller = {
  ...createBrowseCaller(tkdPortalLogService),
  ...createDetailCaller(tkdPortalLogService),
  ...createCreateCaller(tkdPortalLogService),
  ...createUpdateCaller(tkdPortalLogService),
};
