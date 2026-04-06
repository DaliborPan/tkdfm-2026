import { helpdeskTicketService } from "@repo/backend/helpdesk-ticket/service";

import {
  createBrowseCaller,
  createDetailCaller,
  createUpdateCaller,
} from "@/lib/server/callers";

export const helpdeskTicketCaller = {
  ...createBrowseCaller(helpdeskTicketService),
  ...createDetailCaller(helpdeskTicketService),
  ...createUpdateCaller(helpdeskTicketService),
};
