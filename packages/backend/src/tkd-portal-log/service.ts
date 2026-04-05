import { type CurrentUserType } from "../auth/current-user";
import {
  type EntityServiceBrowseType,
  type EntityServiceCreateType,
  type EntityServiceGetType,
  type EntityServiceUpdateType,
} from "../types";
import { validateTrainer } from "../utils/validation";
import { tkdPortalLogMapper } from "./mapper";
import { tkdPortalLogRepository } from "./repository";
import {
  type TkdPortalLogBrowseType,
  type TkdPortalLogCreateType,
  type TkdPortalLogDetailType,
  type TkdPortalLogUpdateType,
} from "./schema";

const browse: EntityServiceBrowseType<{
  items: TkdPortalLogBrowseType[];
  totalCount: number;
}> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const result = await tkdPortalLogRepository.browse(input);
  return {
    items: result.items.map(tkdPortalLogMapper.toTkdPortalLogBrowse),
    totalCount: result.totalCount,
  };
};

const get: EntityServiceGetType<TkdPortalLogDetailType> = async ({
  id,
  currentUser,
}) => {
  validateTrainer(currentUser);

  const row = await tkdPortalLogRepository.get(id);
  return row ? tkdPortalLogMapper.toTkdPortalLogDetail(row) : null;
};

const create: EntityServiceCreateType<
  TkdPortalLogCreateType,
  TkdPortalLogDetailType
> = async ({ input, currentUser }) => {
  validateTrainer(currentUser);

  const row = await tkdPortalLogRepository.create(input);
  return tkdPortalLogMapper.toTkdPortalLogDetail(row);
};

const update: EntityServiceUpdateType<
  TkdPortalLogUpdateType,
  TkdPortalLogDetailType
> = async ({ id, input, currentUser }) => {
  validateTrainer(currentUser);

  const row = await tkdPortalLogRepository.update(id, input);
  return tkdPortalLogMapper.toTkdPortalLogDetail(row);
};

const findAll = async ({ currentUser }: { currentUser: CurrentUserType }) => {
  validateTrainer(currentUser);

  const rows = await tkdPortalLogRepository.findAll();
  return rows.map(tkdPortalLogMapper.toTkdPortalLogDetail);
};

export const tkdPortalLogService = {
  browse,
  get,
  create,
  update,

  findAll,
};
