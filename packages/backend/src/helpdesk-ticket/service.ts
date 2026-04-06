import {
  type EntityServiceBrowseType,
  type EntityServiceGetType,
  type EntityServiceUpdateType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { helpdeskTicketMapper } from "./mapper";
import { helpdeskTicketRepository } from "./repository";
import {
  type HelpdeskTicketBrowseType,
  type HelpdeskTicketDetailType,
  type HelpdeskTicketUpdateType,
} from "./schema";

const browse: EntityServiceBrowseType<{
  items: HelpdeskTicketBrowseType[];
  totalCount: number;
}> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const result = await helpdeskTicketRepository.browse(input);

  return {
    items: result.items.map(helpdeskTicketMapper.toHelpdeskTicketBrowse),
    totalCount: result.totalCount,
  };
};

const get: EntityServiceGetType<HelpdeskTicketDetailType> = async ({
  id,
  currentUser,
}) => {
  validateTrainer(currentUser);

  const row = await helpdeskTicketRepository.get(id);
  return row ? helpdeskTicketMapper.toHelpdeskTicketDetail(row) : null;
};

const update: EntityServiceUpdateType<
  HelpdeskTicketUpdateType,
  HelpdeskTicketDetailType
> = async ({ id, input, currentUser }) => {
  validateTrainer(currentUser);

  const row = await helpdeskTicketRepository.update(id, input);
  return helpdeskTicketMapper.toHelpdeskTicketDetail(row);
};

export const helpdeskTicketService = {
  browse,
  get,
  update,

  async findAll() {
    const rows = await helpdeskTicketRepository.findAll();
    return rows.map(helpdeskTicketMapper.toHelpdeskTicketDetail);
  },

  async findByParentId(parentId: string) {
    const rows = await helpdeskTicketRepository.findByParentId(parentId);
    return rows.map(helpdeskTicketMapper.toHelpdeskTicketDetail);
  },
};
