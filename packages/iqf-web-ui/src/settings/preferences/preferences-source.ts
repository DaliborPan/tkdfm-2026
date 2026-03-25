import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { type PreferenceObject } from "../context";
import { clearPreferences } from "./api/clear";
import { getPreferences } from "./api/get";
import { setPreferences } from "./api/set";

export function usePreferenceSource(enabled = true, url?: string) {
  const query = useQuery({
    queryKey: ["init-preferences"],
    queryFn: () => getPreferences(url),
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  const get = useCallback(
    (values: { key: string; version: number }) => {
      const preferences = query.data?.[values.key];

      if (preferences && preferences.version !== values.version) {
        return undefined;
      }

      return preferences;
    },
    [query],
  );

  const getAll = useCallback(() => {
    return query.data;
  }, [query]);

  const set = useMutation({
    mutationFn: (values: { key: string; preferences: PreferenceObject }) => {
      const newPreferences = {
        ...query.data,
        [values.key]: {
          ...query.data?.[values.key],
          ...values.preferences,
        },
      };

      return setPreferences(url, newPreferences);
    },
  });

  const clear = useMutation({
    mutationFn: () => {
      return clearPreferences(url);
    },
  });

  const remove = useMutation({
    mutationFn: (key: string) => {
      const newPreferences = { ...query.data };

      delete newPreferences[key];

      return setPreferences(url, newPreferences);
    },
  });

  const refresh = async () => {
    await query.refetch();
  };

  return {
    get,
    getAll,
    set: set.mutateAsync,
    refresh,
    remove: remove.mutateAsync,
    clear: clear.mutateAsync,
    loaded: query.isFetched,
  };
}
