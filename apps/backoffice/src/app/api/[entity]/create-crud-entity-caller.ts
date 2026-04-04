type ParseableSchema<T> = {
  parse: (input: unknown) => T;
};

type CrudCaller<TBrowseInput, TBrowseResult, TDetail, TCreateInput, TUpdateInput> = {
  browse: (input: TBrowseInput) => Promise<TBrowseResult>;
  get: (id: string) => Promise<TDetail | null>;
  create: (input: TCreateInput) => Promise<TDetail>;
  update: (id: string, input: TUpdateInput) => Promise<TDetail>;
};

export type EntityCaller = {
  browse: {
    schema: ParseableSchema<unknown>;
    handler: (input: unknown) => Promise<{ items: unknown[]; totalCount: number }>;
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
  TBrowseInput,
  TBrowseResult extends { items: unknown[]; totalCount: number },
  TDetail,
  TCreateInput,
  TUpdateInput,
>({
  browseSchema,
  createSchema,
  updateSchema,
  caller,
}: {
  browseSchema: ParseableSchema<TBrowseInput>;
  createSchema: ParseableSchema<TCreateInput>;
  updateSchema: ParseableSchema<TUpdateInput>;
  caller: CrudCaller<
    TBrowseInput,
    TBrowseResult,
    TDetail,
    TCreateInput,
    TUpdateInput
  >;
}) {
  return {
    browse: {
      schema: browseSchema,
      handler: (input: unknown) => caller.browse(input as TBrowseInput),
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
