import { groupRegularTrainingMapper } from "./mapper";
import { groupRegularTrainingRepository } from "./repository";

export const groupRegularTrainingService = {
  async findAll() {
    const rows = await groupRegularTrainingRepository.findAll();
    return rows.map(groupRegularTrainingMapper.toGroupRegularTrainingDetail);
  },

  async findByGroupId(groupId: string) {
    const rows = await groupRegularTrainingRepository.findByGroupId(groupId);
    return rows.map(groupRegularTrainingMapper.toGroupRegularTrainingDetail);
  },
};
