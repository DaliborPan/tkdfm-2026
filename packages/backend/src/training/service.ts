import { trainingMapper } from "./mapper";
import { trainingRepository } from "./repository";

export const trainingService = {
  async findAll() {
    const rows = await trainingRepository.findAll();
    return rows.map(trainingMapper.toTrainingDetail);
  },
};
