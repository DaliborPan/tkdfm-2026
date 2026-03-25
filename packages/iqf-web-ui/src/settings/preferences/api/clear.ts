import axios from "axios";

export async function clearPreferences(url: string | undefined): Promise<void> {
  if (!url) {
    window.localStorage.removeItem("preferences");

    return;
  }

  const result = await axios.delete(url, {
    headers: {
      Accept: "*/*",
    },
  });

  return result.data;
}
