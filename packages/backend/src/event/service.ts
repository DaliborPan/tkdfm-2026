import { eventMapper } from "./mapper";
import { eventRepository } from "./repository";

export const eventService = {
  async findAll() {
    const rows = await eventRepository.findAll();
    return rows.map(eventMapper.toEventDetail);
  },
};
