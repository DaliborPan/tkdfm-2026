import { groupService } from "@repo/backend/group/service";

import {
  createBrowseCaller,
  createDetailCaller,
  createUpdateCaller,
} from "@/lib/server/callers";

export const groupCaller = {
  ...createBrowseCaller(groupService),
  ...createDetailCaller(groupService),
  ...createUpdateCaller(groupService),
};
