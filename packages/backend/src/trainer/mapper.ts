import type { Trainer } from "../../generated/client";
import { trainerDetailSchema } from "./schema";

export const trainerMapper = {
  toTrainerDetail(trainer: Trainer) {
    return trainerDetailSchema.parse({
      id: trainer.id,
      name: trainer.name,
      email: trainer.email,
      nationalId: trainer.nationalId,
    });
  },
};
