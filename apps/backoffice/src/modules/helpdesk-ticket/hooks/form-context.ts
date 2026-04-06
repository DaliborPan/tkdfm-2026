import { type HelpdeskTicketDetailType } from "@repo/backend/helpdesk-ticket/schema";
import { useDataFormContext } from "iqf-web-ui/data-form";

export const useHelpdeskTicketFormContext =
  useDataFormContext<HelpdeskTicketDetailType, HelpdeskTicketDetailType>;
