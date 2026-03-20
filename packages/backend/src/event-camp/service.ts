import { eventCampMapper } from "./mapper";
import { eventCampRepository } from "./repository";

export const eventCampService = {
  async findAll() {
    const rows = await eventCampRepository.findAll();
    return rows.map(eventCampMapper.toEventCampDetail);
  },
};
