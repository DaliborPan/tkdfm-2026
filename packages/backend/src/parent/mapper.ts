import type { Parent } from "../../generated/client";
import { parentDetailSchema, type ParentDetailType } from "./schema";

export const parentMapper = {
  toParentDetail(parent: Parent): ParentDetailType {
    return parentDetailSchema.parse({
      id: parent.id,
      role: parent.role,
      nationalId: parent.nationalId,
      birthDate: parent.birthDate,
      phoneNumber: parent.phoneNumber,
      email: parent.email,
      street: parent.street,
      streetNumber: parent.streetNumber,
      city: parent.city,
      registered: parent.registered,
      weight: parent.weight ?? null,
      height: parent.height ?? null,
      disability: parent.disability,
      gender: parent.gender,
      mskGroup: parent.mskGroup,
      nsaGroup: parent.nsaGroup,
      studentId: parent.studentId,
    });
  },
};
