import { helpdeskTicketMapper } from "./mapper";
import { helpdeskTicketRepository } from "./repository";

export const helpdeskTicketService = {
  async findAll() {
    const rows = await helpdeskTicketRepository.findAll();
    return rows.map(helpdeskTicketMapper.toHelpdeskTicketDetail);
  },

  async findByParentId(parentId: string) {
    const rows = await helpdeskTicketRepository.findByParentId(parentId);
    return rows.map(helpdeskTicketMapper.toHelpdeskTicketDetail);
  },
};
