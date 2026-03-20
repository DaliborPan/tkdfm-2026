import { eventFileMapper } from "./mapper";
import { eventFileRepository } from "./repository";

export const eventFileService = {
  async findAll() {
    const rows = await eventFileRepository.findAll();
    return rows.map(eventFileMapper.toEventFileDetail);
  },

  async findByEventId(eventId: string) {
    const rows = await eventFileRepository.findByEventId(eventId);
    return rows.map(eventFileMapper.toEventFileDetail);
  },
};
