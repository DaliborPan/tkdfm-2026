import { type z } from "zod";

import {
  type BrowseBodyType,
  browseBodySchema,
} from "@repo/backend/utils/browse";

type ParseableSchema<T> = {
  parse: (input: unknown) => T;
};

type BrowseHandler<TBrowseResult> = {
  browse: (input: BrowseBodyType) => Promise<TBrowseResult>;
};

type DetailHandler<TDetail> = {
  get: (id: string) => Promise<TDetail | null>;
};

type CreateHandler<TCreateInput, TDetail> = {
  create: (input: TCreateInput) => Promise<TDetail>;
};

type UpdateHandler<TUpdateInput, TDetail> = {
  update: (id: string, input: TUpdateInput) => Promise<TDetail>;
};

export type EntityCaller = {
  browse?: {
    schema: z.ZodSchema<BrowseBodyType>;
    handler: (
      input: unknown,
    ) => Promise<{ items: unknown[]; totalCount: number }>;
  };
  get?: {
    handler: (id: string) => Promise<unknown | null>;
  };
  create?: {
    schema: ParseableSchema<unknown>;
    handler: (input: unknown) => Promise<unknown>;
  };
  update?: {
    schema: ParseableSchema<unknown>;
    handler: (id: string, input: unknown) => Promise<unknown>;
  };
};

export function createBrowseEntityCaller<
  TBrowseResult extends { items: unknown[]; totalCount: number },
>({
  caller,
}: {
  caller: BrowseHandler<TBrowseResult>;
}) {
  return {
    browse: {
      schema: browseBodySchema,
      handler: (input: unknown) => caller.browse(input as BrowseBodyType),
    },
  } satisfies EntityCaller;
}

export function createDetailEntityCaller<TDetail>({
  caller,
}: {
  caller: DetailHandler<TDetail>;
}) {
  return {
    get: {
      handler: caller.get,
    },
  } satisfies EntityCaller;
}

export function createCreateEntityCaller<TCreateInput, TDetail>({
  schema,
  caller,
}: {
  schema: ParseableSchema<TCreateInput>;
  caller: CreateHandler<TCreateInput, TDetail>;
}) {
  return {
    create: {
      schema,
      handler: (input: unknown) => caller.create(input as TCreateInput),
    },
  } satisfies EntityCaller;
}

export function createUpdateEntityCaller<TUpdateInput, TDetail>({
  schema,
  caller,
}: {
  schema: ParseableSchema<TUpdateInput>;
  caller: UpdateHandler<TUpdateInput, TDetail>;
}) {
  return {
    update: {
      schema,
      handler: (id: string, input: unknown) =>
        caller.update(id, input as TUpdateInput),
    },
  } satisfies EntityCaller;
}
