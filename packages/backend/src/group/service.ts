import { groupMapper } from "./mapper";
import { groupRepository } from "./repository";

export const groupService = {
  async findAll() {
    const rows = await groupRepository.findAll();
    return rows.map(groupMapper.toGroupDetail);
  },
};
