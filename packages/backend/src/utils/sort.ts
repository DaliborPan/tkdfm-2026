import { z } from "zod";

export const sortSchema = z.object({
  field: z.string(),
  order: z.enum(["ASC", "DESC"]),
});

export type SortSchema = z.infer<typeof sortSchema>;

const createNestedObject = (keys: string[], value: string): any => {
  if (keys.length === 0) return value;

  const [first, ...rest] = keys;

  return {
    [first]: createNestedObject(rest, value),
  };
};

export const createOrderByObject = (sorts: SortSchema[]) => {
  if (!sorts.length) {
    return {
      id: "asc",
    };
  }

  const sort = sorts[0];

  return createNestedObject(sort.field.split("."), sort.order.toLowerCase());
};
