import { type CurrentUserType } from "./auth/current-user";
import { type BrowseBodyType } from "./utils/browse";

export type EntityServiceBrowseType<TBrowseResult> = (params: {
  input: BrowseBodyType;
  currentUser: CurrentUserType;
}) => Promise<TBrowseResult>;

export type EntityServiceGetType<TDetail> = (params: {
  id: string;
  currentUser: CurrentUserType;
}) => Promise<TDetail | null>;

export type EntityServiceCreateType<TCreateInput, TDetail> = (params: {
  input: TCreateInput;
  currentUser: CurrentUserType;
}) => Promise<TDetail>;

export type EntityServiceUpdateType<TUpdateInput, TDetail> = (params: {
  id: string;
  input: TUpdateInput;
  currentUser: CurrentUserType;
}) => Promise<TDetail>;
