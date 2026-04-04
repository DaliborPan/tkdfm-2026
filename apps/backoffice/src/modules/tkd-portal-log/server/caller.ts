import { tkdPortalLogService } from "@repo/backend/tkd-portal-log/service";

import { createCrudModuleCaller } from "@/lib/server/create-crud-module-caller";

export const tkdPortalLogCaller = createCrudModuleCaller({
  service: tkdPortalLogService,
});
