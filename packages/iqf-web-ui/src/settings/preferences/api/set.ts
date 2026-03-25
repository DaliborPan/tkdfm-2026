import axios from "axios";

import { type Preferences } from "../../context";

export async function setPreferences(
  url: string | undefined,
  settings: Preferences,
): Promise<void> {
  if (!url) {
    window.localStorage.setItem("preferences", JSON.stringify(settings));

    return;
  }
  const result = await axios.put(url, settings);

  return result.data;
}
