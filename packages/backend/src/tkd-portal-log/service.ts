import type { CurrentUserType } from "../auth/current-user";
import { type BrowseBodyType } from "../utils";
import { tkdPortalLogMapper } from "./mapper";
import { tkdPortalLogRepository } from "./repository";
import {
  type TkdPortalLogCreateType,
  type TkdPortalLogUpdateType,
} from "./schema";

export const tkdPortalLogService = {
  async browse({
    input,
    currentUser: _currentUser,
  }: {
    input: BrowseBodyType;
    currentUser: CurrentUserType;
  }) {
    const result = await tkdPortalLogRepository.browse(input);

    return {
      items: result.items.map(tkdPortalLogMapper.toTkdPortalLogBrowse),
      totalCount: result.totalCount,
    };
  },

  async findAll() {
    const rows = await tkdPortalLogRepository.findAll();
    return rows.map(tkdPortalLogMapper.toTkdPortalLogDetail);
  },

  async get({
    id,
    currentUser: _currentUser,
  }: {
    id: string;
    currentUser: CurrentUserType;
  }) {
    const row = await tkdPortalLogRepository.get(id);
    return row ? tkdPortalLogMapper.toTkdPortalLogDetail(row) : null;
  },

  async create({
    input,
    currentUser: _currentUser,
  }: {
    input: TkdPortalLogCreateType;
    currentUser: CurrentUserType;
  }) {
    const row = await tkdPortalLogRepository.create(input);
    return tkdPortalLogMapper.toTkdPortalLogDetail(row);
  },

  async update({
    id,
    input,
    currentUser: _currentUser,
  }: {
    id: string;
    input: TkdPortalLogUpdateType;
    currentUser: CurrentUserType;
  }) {
    const { id: _id, ...updateData } = input;
    const row = await tkdPortalLogRepository.update(id, updateData);
    return tkdPortalLogMapper.toTkdPortalLogDetail(row);
  },
};
