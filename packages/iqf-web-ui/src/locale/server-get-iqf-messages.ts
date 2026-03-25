"server-only";

import { type Locale } from "./schema";
import { type Messages } from "./types";

export const serverGetIqfMessages = async (
  locale: Locale,
): Promise<Messages> => {
  return (await import(`../messages/${locale}.json`)).default;
};
