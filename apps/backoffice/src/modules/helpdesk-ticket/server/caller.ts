import { helpdeskTicketService } from "@repo/backend/helpdesk-ticket/service";

import {
  createBrowseCaller,
  createDetailCaller,
} from "@/lib/server/callers";

export const helpdeskTicketCaller = {
  ...createBrowseCaller(helpdeskTicketService),
  ...createDetailCaller(helpdeskTicketService),
};
