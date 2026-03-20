import { eventCompetitionMapper } from "./mapper";
import { eventCompetitionRepository } from "./repository";

export const eventCompetitionService = {
  async findAll() {
    const rows = await eventCompetitionRepository.findAll();
    return rows.map(eventCompetitionMapper.toEventCompetitionDetail);
  },
};
