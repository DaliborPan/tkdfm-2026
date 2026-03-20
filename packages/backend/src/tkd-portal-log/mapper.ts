import type { TkdPortalLog } from "../../generated/client";
import { tkdPortalLogDetailSchema } from "./schema";

export const tkdPortalLogMapper = {
  toTkdPortalLogDetail(tkdPortalLog: TkdPortalLog) {
    return tkdPortalLogDetailSchema.parse({
      id: tkdPortalLog.id,
      createdAt: tkdPortalLog.createdAt.toISOString(),
      nationalId: tkdPortalLog.nationalId,
      firstName: tkdPortalLog.firstName,
      lastName: tkdPortalLog.lastName,
      type: tkdPortalLog.type,
      field: tkdPortalLog.field,
      oldValue: tkdPortalLog.oldValue,
      newValue: tkdPortalLog.newValue,
      note: tkdPortalLog.note,
    });
  },
};
