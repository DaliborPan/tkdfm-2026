import { type z } from "zod";

import {
  type BrowseBodyType,
  browseBodySchema,
} from "@repo/backend/utils/browse";

type ParseableSchema<T> = {
  parse: (input: unknown) => T;
};

type CrudCaller<
  TBrowseInput,
  TBrowseResult,
  TDetail,
  TCreateInput,
  TUpdateInput,
> = {
  browse: (input: TBrowseInput) => Promise<TBrowseResult>;
  get: (id: string) => Promise<TDetail | null>;
  create: (input: TCreateInput) => Promise<TDetail>;
  update: (id: string, input: TUpdateInput) => Promise<TDetail>;
};

export type EntityCaller = {
  browse: {
    schema: z.ZodSchema<BrowseBodyType>;
    handler: (
      input: unknown,
    ) => Promise<{ items: unknown[]; totalCount: number }>;
  };
  get: {
    handler: (id: string) => Promise<unknown | null>;
  };
  create: {
    schema: ParseableSchema<unknown>;
    handler: (input: unknown) => Promise<unknown>;
  };
  update: {
    schema: ParseableSchema<unknown>;
    handler: (id: string, input: unknown) => Promise<unknown>;
  };
};

export function createCrudEntityCaller<
  TBrowseResult extends { items: unknown[]; totalCount: number },
  TDetail,
  TCreateInput,
  TUpdateInput,
>({
  createSchema,
  updateSchema,
  caller,
}: {
  createSchema: ParseableSchema<TCreateInput>;
  updateSchema: ParseableSchema<TUpdateInput>;
  caller: CrudCaller<
    BrowseBodyType,
    TBrowseResult,
    TDetail,
    TCreateInput,
    TUpdateInput
  >;
}) {
  return {
    browse: {
      schema: browseBodySchema,
      handler: (input: unknown) => caller.browse(input as BrowseBodyType),
    },
    get: {
      handler: caller.get,
    },
    create: {
      schema: createSchema,
      handler: (input: unknown) => caller.create(input as TCreateInput),
    },
    update: {
      schema: updateSchema,
      handler: (id: string, input: unknown) =>
        caller.update(id, input as TUpdateInput),
    },
  } satisfies EntityCaller;
}
