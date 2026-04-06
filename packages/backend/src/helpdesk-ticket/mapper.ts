import type { Prisma } from "../../generated/client";
import {
  helpdeskTicketBrowseSchema,
  helpdeskTicketDetailSchema,
} from "./schema";

type HelpdeskTicketWithReporter = Prisma.HelpdeskTicketGetPayload<{
  include: {
    parent: {
      include: {
        student: true;
      };
    };
  };
}>;

const getReporterName = (helpdeskTicket: HelpdeskTicketWithReporter) => {
  const student = helpdeskTicket.parent?.student;

  if (!student) {
    return null;
  }

  return `${student.firstName} ${student.lastName}`;
};

export const helpdeskTicketMapper = {
  toHelpdeskTicketBrowse(helpdeskTicket: HelpdeskTicketWithReporter) {
    return helpdeskTicketBrowseSchema.parse({
      id: helpdeskTicket.id,
      createdAt: helpdeskTicket.createdAt.toISOString(),
      updatedAt: helpdeskTicket.updatedAt.toISOString(),
      status: helpdeskTicket.status,
      parentId: helpdeskTicket.parentId ?? null,
      reporterName: getReporterName(helpdeskTicket),
    });
  },

  toHelpdeskTicketDetail(helpdeskTicket: HelpdeskTicketWithReporter) {
    return helpdeskTicketDetailSchema.parse({
      id: helpdeskTicket.id,
      createdAt: helpdeskTicket.createdAt.toISOString(),
      updatedAt: helpdeskTicket.updatedAt.toISOString(),
      text: helpdeskTicket.text,
      status: helpdeskTicket.status,
      parentId: helpdeskTicket.parentId ?? null,
      reporterName: getReporterName(helpdeskTicket),
    });
  },
};
