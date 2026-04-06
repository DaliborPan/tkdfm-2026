import {
  type HelpdeskTicketDetailType,
  type HelpdeskTicketUpdateType,
} from "@repo/backend/helpdesk-ticket/schema";
import { useDataFormContext } from "iqf-web-ui/data-form";

export const useHelpdeskTicketFormContext =
  useDataFormContext<HelpdeskTicketDetailType, HelpdeskTicketUpdateType>;
