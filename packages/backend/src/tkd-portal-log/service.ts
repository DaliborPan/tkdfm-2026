import { tkdPortalLogMapper } from "./mapper";
import { tkdPortalLogRepository } from "./repository";

export const tkdPortalLogService = {
  async findAll() {
    const rows = await tkdPortalLogRepository.findAll();
    return rows.map(tkdPortalLogMapper.toTkdPortalLogDetail);
  },
};
