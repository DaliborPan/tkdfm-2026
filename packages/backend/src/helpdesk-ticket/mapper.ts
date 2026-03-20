import type { HelpdeskTicket } from "../../generated/client";
import { helpdeskTicketDetailSchema } from "./schema";

export const helpdeskTicketMapper = {
  toHelpdeskTicketDetail(helpdeskTicket: HelpdeskTicket) {
    return helpdeskTicketDetailSchema.parse({
      id: helpdeskTicket.id,
      createdAt: helpdeskTicket.createdAt.toISOString(),
      updatedAt: helpdeskTicket.updatedAt.toISOString(),
      text: helpdeskTicket.text,
      status: helpdeskTicket.status,
      parentId: helpdeskTicket.parentId ?? null,
    });
  },
};
