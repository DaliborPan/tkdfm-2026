import { type CurrentUserType } from "../auth/current-user";

export const validateTrainer = (currentUser: CurrentUserType) => {
  if (currentUser.role !== "TRAINER") {
    throw new Error("User is not a trainer");
  }
};
