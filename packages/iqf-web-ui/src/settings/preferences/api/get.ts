import axios from "axios";

import { type Preferences } from "../../context";

export async function getPreferences(
  url: string | undefined,
): Promise<Preferences> {
  if (!url) {
    const preferences = window.localStorage.getItem("preferences");

    if (preferences) {
      return JSON.parse(preferences);
    }

    return {};
  }

  const result = await axios.get(url, {
    headers: {
      Accept: "*/*",
    },
  });

  return result.data;
}
