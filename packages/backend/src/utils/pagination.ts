import { type BrowseBodyType } from "./browse";

/* ------------------------------- Pagination ------------------------------- */

export const createPaginationObject = ({
  skip,
  take,
}: Pick<BrowseBodyType, "skip" | "take">) => {
  return {
    skip,
    take: take === -1 ? undefined : take,
  };
};
