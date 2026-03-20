import { eventSeminarMapper } from "./mapper";
import { eventSeminarRepository } from "./repository";

export const eventSeminarService = {
  async findAll() {
    const rows = await eventSeminarRepository.findAll();
    return rows.map(eventSeminarMapper.toEventSeminarDetail);
  },
};
