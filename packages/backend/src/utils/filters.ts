import { z } from "zod";

export const textFilterSchema = z.object({
  column: z.literal("TEXT"),
  name: z.string(),
  value: z.array(z.string()),
});

export const notNullFilterSchema = z.object({
  column: z.literal("NOT_NULL"),
  name: z.string(),
  value: z.array(z.boolean()),
});

export const enumFilterSchema = z.object({
  column: z.literal("ENUM"),
  name: z.string(),
  value: z.array(z.union([z.string(), z.boolean()])),
});

export const dateFilterSchema = z.object({
  column: z.literal("DATE"),
  name: z.string(),
  value: z.array(z.string()),
});

export const orFilterSchema = z.object({
  column: z.literal("_OR"),
  filters: z.array(
    z.discriminatedUnion("column", [
      textFilterSchema,
      enumFilterSchema,
      dateFilterSchema,
    ]),
  ),
  value: z.array(z.string()).nullish(),
  name: z.string().nullish(),
});

export const filterSchema = z.discriminatedUnion("column", [
  textFilterSchema,
  notNullFilterSchema,
  enumFilterSchema,
  dateFilterSchema,
  orFilterSchema,
]);

export type FilterSchema = z.infer<typeof filterSchema>;

const createNestedObject = (keys: string[], value: any): any => {
  if (keys.length === 0) return value;

  const [first, ...rest] = keys;

  return {
    [first]: createNestedObject(rest, value),
  };
};

const createTextFilterObjects = (filters: FilterSchema[]) => {
  const textFilters = filters.filter((filter) => filter.column === "TEXT");

  return textFilters.map((textFilter) => ({
    OR: textFilter.value.map((value) =>
      createNestedObject(textFilter.name.split("."), {
        contains: value,
        mode: "insensitive",
      }),
    ),
  }));
};

const createNotNullFilterObjects = (filters: FilterSchema[]) => {
  const textFilters = filters.filter((filter) => filter.column === "NOT_NULL");

  return textFilters.map((textFilter) => {
    const value = textFilter.value.at(0);

    return createNestedObject(
      textFilter.name.split("."),
      value ? { isNot: null } : null,
    );
  });
};

const createEnumFilterObjects = (filters: FilterSchema[]) => {
  const enumFilters = filters.filter((filter) => filter.column === "ENUM");

  return enumFilters.map((enumFilter) => ({
    OR: enumFilter.value.map((value) =>
      createNestedObject(enumFilter.name.split("."), { equals: value }),
    ),
  }));
};

const createDateFilterObjects = (filters: FilterSchema[]) => {
  const dateFilters = filters.filter((filter) => filter.column === "DATE");

  return dateFilters.map((dateFilter) => {
    const [from, to] = dateFilter.value;

    return {
      AND: [
        createNestedObject(dateFilter.name.split("."), {
          gte: from,
        }),
        createNestedObject(dateFilter.name.split("."), {
          lte: to,
        }),
      ],
    };
  });
};

const createOrFilters = (filters: FilterSchema[]) => {
  const orFilters = filters.filter((filter) => filter.column === "_OR");

  return {
    OR: orFilters.map(({ filters }) => ({
      OR: [
        ...createTextFilterObjects(filters),
        ...createEnumFilterObjects(filters),
        ...createDateFilterObjects(filters),
      ],
    })),
  };
};

export const createWhereObject = (
  filters: FilterSchema[],
  options?: { custom?: any },
) => {
  const filterObjects = [
    createOrFilters(filters),
    ...createNotNullFilterObjects(filters),
    ...createTextFilterObjects(filters),
    ...createEnumFilterObjects(filters),
    ...createDateFilterObjects(filters),
  ];

  return {
    AND: [
      ...(filterObjects.length ? filterObjects : []),
      ...(options?.custom ? [options.custom] : []),
    ],
  };
};
