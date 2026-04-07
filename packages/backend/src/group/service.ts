import {
  type EntityServiceBrowseType,
  type EntityServiceGetType,
  type EntityServiceUpdateType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { groupMapper } from "./mapper";
import { groupRepository } from "./repository";
import {
  type GroupBrowseType,
  type GroupDetailType,
  type GroupUpdateType,
} from "./schema";

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

const update: EntityServiceUpdateType<GroupUpdateType, GroupDetailType> = async ({
  id,
  input,
  currentUser,
}) => {
  validateTrainer(currentUser);

  const row = await groupRepository.update(id, input);
  return groupMapper.toGroupDetail(row);
};

export const groupService = {
  browse,
  get,
  update,

  async findAll() {
    const rows = await groupRepository.findAll();
    return rows.map(groupMapper.toGroupDetail);
  },
};
