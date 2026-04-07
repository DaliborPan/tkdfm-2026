import {
  type EntityServiceBrowseType,
  type EntityServiceCreateType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { groupRegularTrainingMapper } from "./mapper";
import { groupRegularTrainingRepository } from "./repository";
import {
  type GroupRegularTrainingCreateType,
  type GroupRegularTrainingDetailType,
} from "./schema";

const create: EntityServiceCreateType<
  GroupRegularTrainingCreateType,
  GroupRegularTrainingDetailType
> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const row = await groupRegularTrainingRepository.create({
    dayOfWeek: input.dayOfWeek,
    startsAt: input.startsAt,
    endsAt: input.endsAt,
    note: input.note,
    group: {
      connect: {
        id: input.groupId,
      },
    },
  });

  return groupRegularTrainingMapper.toGroupRegularTrainingDetail(row);
};

const browse: EntityServiceBrowseType<{
  items: GroupRegularTrainingDetailType[];
  totalCount: number;
}> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const result = await groupRegularTrainingRepository.browse(input);

  return {
    items: result.items.map(
      groupRegularTrainingMapper.toGroupRegularTrainingDetail,
    ),
    totalCount: result.totalCount,
  };
};

export const groupRegularTrainingService = {
  browse,
  create,

  async findAll() {
    const rows = await groupRegularTrainingRepository.findAll();
    return rows.map(groupRegularTrainingMapper.toGroupRegularTrainingDetail);
  },

  async findByGroupId(groupId: string) {
    const rows = await groupRegularTrainingRepository.findByGroupId(groupId);
    return rows.map(groupRegularTrainingMapper.toGroupRegularTrainingDetail);
  },
};
