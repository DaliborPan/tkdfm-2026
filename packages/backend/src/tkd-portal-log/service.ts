import { parseBrowseBody } from "../utils";
import { tkdPortalLogMapper } from "./mapper";
import { tkdPortalLogRepository } from "./repository";
import { tkdPortalLogCreateSchema } from "./schema";

export const tkdPortalLogService = {
  async browse(body: unknown) {
    const parsedBody = parseBrowseBody(body);

    if (!parsedBody) {
      return {
        items: [],
        totalCount: 0,
      };
    }

    const result = await tkdPortalLogRepository.browse(parsedBody);

    return {
      items: result.items.map(tkdPortalLogMapper.toTkdPortalLogBrowse),
      totalCount: result.totalCount,
    };
  },

  async findAll() {
    const rows = await tkdPortalLogRepository.findAll();
    return rows.map(tkdPortalLogMapper.toTkdPortalLogDetail);
  },

  async get(id: string) {
    const row = await tkdPortalLogRepository.get(id);
    return row ? tkdPortalLogMapper.toTkdPortalLogDetail(row) : null;
  },

  async create(data: unknown) {
    const parsedData = tkdPortalLogCreateSchema.parse(data);
    const row = await tkdPortalLogRepository.create(parsedData);
    return tkdPortalLogMapper.toTkdPortalLogDetail(row);
  },

  async update(id: string, data: unknown) {
    const parsedData = tkdPortalLogMapper.toTkdPortalLogUpdate(data);
    const { id: _id, ...updateData } = parsedData;
    const row = await tkdPortalLogRepository.update(id, updateData);
    return tkdPortalLogMapper.toTkdPortalLogDetail(row);
  },
};
