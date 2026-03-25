import { useSettingsContext } from "../../../settings/context";
import { useDataFormContext } from "../context/data-form-context";

/**
 * Uses `url` from dataFormContext and `q` query param from the URL
 */
export function useUrlHref() {
  const { url } = useDataFormContext();
  const { router } = useSettingsContext();

  const queryParams = router.searchParams;
  const searchQueryParam = queryParams?.get("q") ?? "";

  /**
   * Keeping only `?q=` query param in the URL
   */
  return `${url}${searchQueryParam ? `?q=${searchQueryParam}` : ""}`;
}
