import { groupService } from "@repo/backend/group/service";

import {
  createBrowseCaller,
  createDetailCaller,
} from "@/lib/server/callers";

export const groupCaller = {
  ...createBrowseCaller(groupService),
  ...createDetailCaller(groupService),
};
