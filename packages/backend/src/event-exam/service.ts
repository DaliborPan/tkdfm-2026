import { eventExamMapper } from "./mapper";
import { eventExamRepository } from "./repository";

export const eventExamService = {
  async findAll() {
    const rows = await eventExamRepository.findAll();
    return rows.map(eventExamMapper.toEventExamDetail);
  },
};
