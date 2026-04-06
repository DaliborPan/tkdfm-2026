import {
  type EntityServiceBrowseType,
  type EntityServiceGetType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { groupMapper } from "./mapper";
import { groupRepository } from "./repository";
import { type GroupBrowseType, type GroupDetailType } from "./schema";

const browse: EntityServiceBrowseType<{
  items: GroupBrowseType[];
  totalCount: number;
}> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const result = await groupRepository.browse(input);

  return {
    items: result.items.map(groupMapper.toGroupBrowse),
    totalCount: result.totalCount,
  };
};

const get: EntityServiceGetType<GroupDetailType> = async ({
  id,
  currentUser,
}) => {
  validateTrainer(currentUser);

  const row = await groupRepository.get(id);
  return row ? groupMapper.toGroupDetail(row) : null;
};

export const groupService = {
  browse,
  get,

  async findAll() {
    const rows = await groupRepository.findAll();
    return rows.map(groupMapper.toGroupDetail);
  },
};
