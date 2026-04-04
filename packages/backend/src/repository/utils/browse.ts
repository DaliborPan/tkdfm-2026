import { prisma } from "../../client";

export const createBrowseResult = async <T>({
  data,
  entity,
  where,
}: {
  data: T[];
  entity: keyof typeof prisma;
  where: any;
}) => {
  const model = prisma[entity] as unknown as {
    count: (args: { where: any }) => Promise<number>;
  };

  return {
    items: data,
    totalCount: await model.count({ where }),
  };
};
