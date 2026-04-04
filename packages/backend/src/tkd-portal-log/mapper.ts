import type { TkdPortalLog } from "../../generated/client";
import {
  tkdPortalLogBrowseSchema,
  tkdPortalLogDetailSchema,
  tkdPortalLogUpdateSchema,
} from "./schema";

export const tkdPortalLogMapper = {
  toTkdPortalLogBrowse(tkdPortalLog: TkdPortalLog) {
    return tkdPortalLogBrowseSchema.parse({
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

  toTkdPortalLogUpdate(data: unknown) {
    return tkdPortalLogUpdateSchema.parse(data);
  },
};
