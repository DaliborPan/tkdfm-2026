import { type GroupDetailType } from "@repo/backend/group/schema";
import { useDataFormContext } from "iqf-web-ui/data-form";

export const useGroupFormContext = useDataFormContext<
  GroupDetailType,
  GroupDetailType
>;
