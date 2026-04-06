import {
  type EntityServiceBrowseType,
  type EntityServiceCreateType,
  type EntityServiceGetType,
  type EntityServiceUpdateType,
} from "@repo/backend/types";
import { type BrowseBodyType } from "@repo/backend/utils/browse";

import { getRequestContext } from "./request-context";

/**
 * Create a caller for the browse method of a service.
 *
 * Acceppts a service object that implements the browse method.
 */
export function createBrowseCaller<TBrowseResult>(service: {
  browse: EntityServiceBrowseType<TBrowseResult>;
}) {
  return {
    browse: async (input: BrowseBodyType) => {
      const { currentUser } = await getRequestContext();

      return service.browse({ input, currentUser });
    },
  };
}

/**
 * Create a caller for the get method of a service.
 *
 * Acceppts a service object that implements the get method.
 */
export function createDetailCaller<TDetail>(service: {
  get: EntityServiceGetType<TDetail>;
}) {
  return {
    get: async (id: string) => {
      const { currentUser } = await getRequestContext();

      return service.get({ id, currentUser });
    },
  };
}

/**
 * Create a caller for the create method of a service.
 *
 * Acceppts a service object that implements the create method.
 */
export function createCreateCaller<TCreateInput, TDetail>(service: {
  create: EntityServiceCreateType<TCreateInput, TDetail>;
}) {
  return {
    create: async (input: TCreateInput) => {
      const { currentUser } = await getRequestContext();

      return service.create({ input, currentUser });
    },
  };
}

/**
 * Create a caller for the update method of a service.
 *
 * Acceppts a service object that implements the update method.
 */
export function createUpdateCaller<TUpdateInput, TDetail>(service: {
  update: EntityServiceUpdateType<TUpdateInput, TDetail>;
}) {
  return {
    update: async (id: string, input: TUpdateInput) => {
      const { currentUser } = await getRequestContext();

      return service.update({ id, input, currentUser });
    },
  };
}
