import {
  type TkdPortalLogDetailType,
  type TkdPortalLogUpdateType,
} from "@repo/backend/tkd-portal-log/schema";
import { useDataFormContext } from "iqf-web-ui/data-form";

export const useTkdPortalLogFormContext = useDataFormContext<
  TkdPortalLogDetailType,
  TkdPortalLogUpdateType
>;
