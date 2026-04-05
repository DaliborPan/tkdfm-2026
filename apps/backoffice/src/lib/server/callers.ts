import { type CurrentUserType } from "@repo/backend/auth/current-user";
import { type BrowseBodyType } from "@repo/backend/utils/browse";

import { getRequestContext } from "./request-context";

/**
 * Create a caller for the browse method of a service.
 *
 * Acceppts a service object that implements the browse method.
 */
export function createBrowseCaller<TBrowseResult>({
  browse,
}: {
  browse: (params: {
    input: BrowseBodyType;
    currentUser: CurrentUserType;
  }) => Promise<TBrowseResult>;
}) {
  return {
    browse: async (input: BrowseBodyType) => {
      const { currentUser } = await getRequestContext();

      return browse({ input, currentUser });
    },
  };
}

/**
 * Create a caller for the get method of a service.
 *
 * Acceppts a service object that implements the get method.
 */
export function createDetailCaller<TDetail>({
  get,
}: {
  get: (params: {
    id: string;
    currentUser: CurrentUserType;
  }) => Promise<TDetail | null>;
}) {
  return {
    get: async (id: string) => {
      const { currentUser } = await getRequestContext();

      return get({ id, currentUser });
    },
  };
}

/**
 * Create a caller for the create method of a service.
 *
 * Acceppts a service object that implements the create method.
 */
export function createCreateCaller<TCreateInput, TDetail>({
  create,
}: {
  create: (params: {
    input: TCreateInput;
    currentUser: CurrentUserType;
  }) => Promise<TDetail>;
}) {
  return {
    create: async (input: TCreateInput) => {
      const { currentUser } = await getRequestContext();

      return create({ input, currentUser });
    },
  };
}

/**
 * Create a caller for the update method of a service.
 *
 * Acceppts a service object that implements the update method.
 */
export function createUpdateCaller<TUpdateInput, TDetail>({
  update,
}: {
  update: (params: {
    id: string;
    input: TUpdateInput;
    currentUser: CurrentUserType;
  }) => Promise<TDetail>;
}) {
  return {
    update: async (id: string, input: TUpdateInput) => {
      const { currentUser } = await getRequestContext();

      return update({ id, input, currentUser });
    },
  };
}
