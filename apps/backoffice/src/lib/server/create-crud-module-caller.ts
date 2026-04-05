import { type CurrentUserType } from "@repo/backend/auth/current-user";

import { getRequestContext } from "./request-context";

type CrudService<
  TBrowseInput,
  TBrowseResult,
  TDetail,
  TCreateInput,
  TUpdateInput,
> = {
  browse: (params: {
    input: TBrowseInput;
    currentUser: CurrentUserType;
  }) => Promise<TBrowseResult>;
  get: (params: {
    id: string;
    currentUser: CurrentUserType;
  }) => Promise<TDetail | null>;
  create: (params: {
    input: TCreateInput;
    currentUser: CurrentUserType;
  }) => Promise<TDetail>;
  update: (params: {
    id: string;
    input: TUpdateInput;
    currentUser: CurrentUserType;
  }) => Promise<TDetail>;
};

export function createCrudModuleCaller<
  TBrowseInput,
  TBrowseResult,
  TDetail,
  TCreateInput,
  TUpdateInput,
>({
  service,
}: {
  service: CrudService<
    TBrowseInput,
    TBrowseResult,
    TDetail,
    TCreateInput,
    TUpdateInput
  >;
}) {
  return {
    async browse(input: TBrowseInput) {
      const { currentUser } = await getRequestContext();

      return service.browse({
        input,
        currentUser,
      });
    },

    async get(id: string) {
      const { currentUser } = await getRequestContext();

      return service.get({
        id,
        currentUser,
      });
    },

    async create(input: TCreateInput) {
      const { currentUser } = await getRequestContext();

      return service.create({
        input,
        currentUser,
      });
    },

    async update(id: string, input: TUpdateInput) {
      const { currentUser } = await getRequestContext();

      return service.update({
        id,
        input,
        currentUser,
      });
    },
  };
}
