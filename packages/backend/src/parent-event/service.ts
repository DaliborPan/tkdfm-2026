import { parentEventMapper } from "./mapper";
import { parentEventRepository } from "./repository";

export const parentEventService = {
  async findAll() {
    const rows = await parentEventRepository.findAll();
    return rows.map(parentEventMapper.toParentEventDetail);
  },

  async findByEventId(eventId: string) {
    const rows = await parentEventRepository.findByEventId(eventId);
    return rows.map(parentEventMapper.toParentEventDetail);
  },

  async findByParentId(parentId: string) {
    const rows = await parentEventRepository.findByParentId(parentId);
    return rows.map(parentEventMapper.toParentEventDetail);
  },
};
