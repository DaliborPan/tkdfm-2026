import { trainerMapper } from "./mapper";
import { trainerRepository } from "./repository";

export const trainerService = {
  async findAll() {
    const rows = await trainerRepository.findAll();
    return rows.map(trainerMapper.toTrainerDetail);
  },
};
